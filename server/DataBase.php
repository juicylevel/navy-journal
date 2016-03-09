<?php

/**
 * Выполнение запросов к БД.
 */
class DataBase {
    /**
     * Представляет соединение между PHP и сервером базы данных.
     */
    private $pdo;

    /**
	 * Подключение к базе данных.
     */
    public function __construct () {
        $mysql_host = '127.0.0.1';
        $mysql_database = 'journal';
        $mysql_user = 'root';
        $mysql_password = '';

        $this->pdo = new PDO(
            'mysql:host=' . $mysql_host . ';dbname=' . $mysql_database . ';charset=utf8',
            $mysql_user,
            $mysql_password,
            array(
                PDO::ATTR_PERSISTENT => TRUE,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
            )
        );
    }

    /**
     * Получение информации о последнем завершённом дежурстве.
     */
    public function getLastCompleteDuty () {
        $sql = 'SELECT id, start_date, end_date FROM duty ' .
               'WHERE end_date = (SELECT MAX(end_date) FROM duty)';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Получение информации об активном (текущем) дежурстве.
     */
    public function getActiveDuty () {
        $sql = 'SELECT * FROM duty WHERE end_date IS NULL';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Создание боевого дежурства.
     * @param $startDate Время начала боевого дежурства.
     * @param $name Наименование боевого дежурства.
     * @return int Ижентификатор созданного боевого дежурства.
     */
    public function createDuty ($startDate, $name) {
        $sql = 'INSERT INTO duty (start_date, name) VALUES (:startDate, :name)';
        $stmt = $this->pdo->prepare($sql);
        $data = array(':startDate' => $startDate, ':name' => $name);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
     * Сохранение времени подготовки к боевому дежурству.
     * @param $dutyId Идентификатор боевого дежурства.
     * @param $runUpTime Время подготовки к боевому дежурству.
     */
    public function saveRunUpTime ($dutyId, $runUpTime) {
        $sql = 'UPDATE duty SET runup_time = ? WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = array($runUpTime, $dutyId);
        return $stmt->execute($data);
    }

    /**
     * Сохранение времени завершения боевого дежурства.
     * @param $dutyId Идентификатор боевого дежурства.
     * @param $endDate Время завершения боевого дежурства.
     */
    public function saveDutyEndDate ($dutyId, $endDate) {
        $sql = 'UPDATE duty SET end_date = ? WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = array($endDate, $dutyId);
        return $stmt->execute($data);
    }

    /**
     * Получение общего количества боевых дежурств.
     */
    public function getDutyCount () {
        $sql = 'SELECT * FROM duty';
        $stmt = $this->pdo->query($sql);
        return $stmt->rowCount();
    }

    /**
     * Получение списка боевых дежурств.
     * @param $dutyListColumns Список колонок таблицы боевых дежурств.
     * @param $offset Номер записи, с которой начинается выборка.
     * @param $pageSize Номер записи, которой заканчивается выборка.
     * @param $sort Объект сортировки (ключ - наименование колонки, значение - направление сортировки).
     */
    public function getDutyList ($dutyListColumns, $offset, $pageSize, $sort) {
        // список запрашиваемых колонок
        $columns = implode(', ', $dutyListColumns);

        // сортировка по заданным колонкам и направлению сортировки
        $sortSql = $this->getSortSql($sort, true);

        // сортировка: сначала идёт текущее оевое дежурство
        // (то, у которого duty_end_date = NULL), затем идут
        // завершённые дежурства, отосортированные в соответствии с $sortSql
        $sql = 'SELECT ' . $columns . ' FROM duty ' .
               'ORDER BY ISNULL(end_date) DESC' .
               $sortSql .
               'LIMIT ' . $offset . ',' . $pageSize;
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
	 * Получение элементов провизии.
     * @param $sort Объект сортировки (ключ - наименование колонки, значение - направление сортировки).
	 */
	public function getProvisionsItems ($sort) {
        $sortSql = $this->getSortSql($sort, false);
        // INNER JOIN
        $sql = 'SELECT provisions_item.id, provisions_item.name, provisions_type.name as type_name ' .
               'FROM provisions_item, provisions_type ' .
               'WHERE provisions_item.type_id = provisions_type.id ' .
               (!empty($sortSql) ? 'ORDER BY ' . $sortSql : '');

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

    /**
	 * Добавление нового элемента провизии.
	 * @param $name Наименование нового элемента провизии.
	 */
	public function addProvisionsItem ($name) {
        $sql = 'INSERT INTO provisions_item (name) VALUES (:name)';
        $stmt = $this->pdo->prepare($sql);
        $data = array(':name' => $name);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
	 * Получение информации об элементе провизии.
	 * @param $id Идентификатор элемента провизии.
	 */
	public function getProvisionsItem ($id) {
        $sql = 'SELECT * FROM provisions_item WHERE id = ' . $id;
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
	}

    /**
     * Получение строки сортировки по заданным колонкам и направлению.
     * @param $sort Объект сортировки (ключ - наименование колонки, значение - направление сортировки).
     */
    private function getSortSql ($sort, $isNext) {
        $sortSql = '';
        if (!empty($sort)) {
            foreach ($sort as $key => $value) {
                $sortSql .= ($isNext ? ', ' : ' ') . $key . ' ' . $value;
            }
            $sortSql .= ' ';
        }
        return $sortSql;
    }
}

?>
