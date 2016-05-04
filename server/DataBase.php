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
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8;SET time_zone = 'Europe/Moscow'"
            )
        );
    }

    /**
     * Получение информации о последнем завершённом дежурстве.
     */
    public function getLastCompleteDuty () {
        $sql = 'SELECT id, name, UNIX_TIMESTAMP(start_date) as start_date, ' .
               'TIME_TO_SEC(runup_time) as runup_time, '.
               'UNIX_TIMESTAMP(end_date) as end_date FROM duty ' .
               'WHERE end_date = (SELECT MAX(end_date) FROM duty)';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Получение информации об активном (текущем) дежурстве.
     */
    public function getActiveDuty () {
        $sql = 'SELECT id, name, UNIX_TIMESTAMP(start_date) as start_date, ' .
               'TIME_TO_SEC(runup_time) as runup_time, '.
               'UNIX_TIMESTAMP(end_date) as end_date FROM duty WHERE end_date IS NULL';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Создание боевого дежурства.
     * @param $name Наименование боевого дежурства.
     * @return int Ижентификатор созданного боевого дежурства.
     */
    public function createDuty ($name, $meteoId) {
        $sql = 'INSERT INTO duty (name, meteo_id) VALUES (:name, :meteo_id)';
        $stmt = $this->pdo->prepare($sql);
        $data = array(':name' => $name, ':meteo_id' => $meteoId);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
     * Добавление записи метеоданных.
     * @param $meteo Метеоданные.
     * @return Идентификатор добавленной записи в таблице meteo.
     */
    public function addMeteoData ($meteo) {
        $sql = 'INSERT INTO meteo (' . $this->getInsertedFieldsList($meteo, false) . ') ' .
               'VALUES (' . $this->getInsertedFieldsList($meteo, true) . ')';
        $stmt = $this->pdo->prepare($sql);
        $data = $this->getInsertedValuesList($meteo);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
     * Сохранение времени подготовки к боевому дежурству.
     * @param $dutyId Идентификатор боевого дежурства.
     * @param $runUpTime Время подготовки к боевому дежурству.
     */
    public function saveRunUpTime ($dutyId, $runUpTime) {
        $sql = 'UPDATE duty SET runup_time = SEC_TO_TIME(?) WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = array($runUpTime, $dutyId);
        return $stmt->execute($data);
    }

    /**
     * FROM_UNIXTIME
     * Сохранение времени завершения боевого дежурства.
     * @param $dutyId Идентификатор боевого дежурства.
     */
    public function saveDutyEndDate ($dutyId) {
        $sql = 'UPDATE duty SET end_date = NOW() WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = array($dutyId);
        return $stmt->execute($data);
    }

    /**
     * Получение общего количества боевых дежурств.
     */
    public function getDutyTotal () {
        $sql = 'SELECT COUNT(*) as total FROM duty';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ)->total;
    }

    /**
     * Получение списка боевых дежурств.
     * @param $offset Номер записи, с которой начинается выборка.
     * @param $pageSize Номер записи, которой заканчивается выборка.
     * @param $sort Объект сортировки.
     */
    public function getDutyList ($offset, $pageSize, $sort) {
        // сортировка: сначала идёт текущее оевое дежурство
        // (то, у которого duty_end_date = NULL), затем идут
        // завершённые дежурства, отосортированные в соответствии с $sort
        $sql = 'SELECT id, name, UNIX_TIMESTAMP(start_date) as start_date, ' .
               'TIME_TO_SEC(runup_time) as runup_time, '.
               'UNIX_TIMESTAMP(end_date) as end_date FROM duty ' .
               'ORDER BY ISNULL(end_date) DESC' .
               (!empty($sort) ? ', ' . $this->createSort($sort) . ' ' : '') .
               'LIMIT ' . $offset . ',' . $pageSize;

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
	 * Получение элементов провизии.
     * @param $sort Объект сортировки.
	 */
	public function getProvisionsItems ($sort) {
        $sql = 'SELECT provisions_item.id, provisions_item.name,
                provisions_type.id as type_id,
                provisions_type.name as type_name ' .
               'FROM provisions_item, provisions_type ' .
               'WHERE provisions_item.type_id = provisions_type.id' .
               (!empty($sort) ? ' ORDER BY ' . $this->createSort($sort) : '');

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

    /**
	 * Добавление нового элемента провизии.
	 * @param $item Новый элемент провизии.
	 */
	public function addProvisionsItem ($item) {
        $sql = 'INSERT INTO provisions_item (' . $this->getInsertedFieldsList($item, false) . ') ' .
               'VALUES (' . $this->getInsertedFieldsList($item, true) . ')';
        $stmt = $this->pdo->prepare($sql);
        $data = $this->getInsertedValuesList($item);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
     * Обновление значений полей элемента провизии.
     * @param $item Элемент провизии.
     */
    public function updateProvisionsItem ($item) {
        $id = $item['id'];
        $sql = 'UPDATE provisions_item SET ' . $this->getUpdatedFieldsList($item) . ' WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = $this->getUpdatedValues($item);
        return $stmt->execute($data);
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
     * Получение списка типов провизии.
     */
    public function getProvisionsTypes () {
        $sql = 'SELECT * FROM provisions_type ORDER BY name ASC';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
	 * Получение списка аккумуляторов.
     * @param $sort Объект сортировки.
	 */
    public function getAccumulators ($sort) {
        $sql = 'SELECT * FROM accumulator' . (!empty($sort) ? ' ORDER BY ' . $this->createSort($sort) : '');
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
	 * Добавление нового аккумулятора.
	 * @param $item Новый элемент провизии.
	 */
    public function addAccumulator ($item) {
        $sql = 'INSERT INTO accumulator (' . $this->getInsertedFieldsList($item, false) . ') ' .
               'VALUES (' . $this->getInsertedFieldsList($item, true) . ')';
        $stmt = $this->pdo->prepare($sql);
        $data = $this->getInsertedValuesList($item);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    /**
     * Обновление значений полей аккумулятора.
     * @param $item Элемент провизии.
     */
    public function updateAccumulator ($item) {
        $id = $item['id'];
        $sql = 'UPDATE accumulator SET ' . $this->getUpdatedFieldsList($item) . ' WHERE id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = $this->getUpdatedValues($item);
        return $stmt->execute($data);
    }

    /**
     * Получение строки сортировки по заданным колонкам и направлению.
     * @param $sort Объект сортировки (ключ - наименование колонки, значение - направление сортировки).
     * @return Строка сортировки.
     */
    private function createSort ($sort) {
        $sortList = array();
        foreach ($sort as $column => $direction) {
            $sortList[] = $column . ' ' . $direction;
        }
        return join(', ', $sortList);
    }

    /**
     * Получение строки полей, перечисленных через запятую для вставки в таблицу.
     * Если $withColon = true, то перед наименованиями полей будет добавлен
     * символ ":" для оператора VALUES.
     * @param $item Объект (ассоциативный массив) для вставки в таблицу.
     * @param $withColon boolean
     * @return "field1, field2, field3", если $withColon = true, то ":field1, :field2, :field3"
     */
    private function getInsertedFieldsList ($item, $withColon) {
        $fields = array_keys($item);
        if ($withColon) {
            foreach ($fields as $key => $value) {
                $fields[$key] = ':' . $value;
            }
        }
        return join(', ', $fields);
    }

    /**
     * Получение массива значений для вставки в таблицу.
     * @param $item Объект (ассоциативный массив) для вставки в таблицу.
     * @return array(":field1" => "fieldValue1")
     */
    private function getInsertedValuesList ($item) {
        $result = array();
        foreach ($item as $key => $value) {
            $result[':' . $key] = $value;
        }
        return $result;
    }

    /**
     * Получение строки полей, перечисленных через запятую для обновления
     * записи в таблице.
     * @param $item Объект (ассоциативный массив) для вставки в таблицу.
     * @return "field1 = ?, field2 = ?"
     */
    private function getUpdatedFieldsList ($item) {
        $fields = array_keys($item);
        $updateFields = array();
        foreach ($fields as $key => $value) {
            if ($key != 'id') {
                $updateFields[$key] = $value . ' = ?';
            }
        }
        return join(', ', $updateFields);
    }

    /**
     * Получение массива значений для обновления записи в таблице.
     * @param $item Объект (ассоциативный массив) для вставки в таблицу.
     * @return array("fieldValue1", "fieldValue2", "fieldValue3", "id")
     */
    private function getUpdatedValues ($item) {
        $result = array();
        foreach ($item as $key => $value) {
            if ($key != 'id') {
                $result[] = $value;
            }
        }
        // нужно, чтобы id был последним в списке.
        $result[] = $item['id'];
        return $result;
    }
}

?>
