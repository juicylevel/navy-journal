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
        $sql = 'SELECT duty_id, duty_start_date, duty_end_date FROM duty_tbl ' .
               'WHERE duty_end_date = (SELECT MAX(duty_end_date) FROM duty_tbl)';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * Получение информации об активном (текущем) дежурстве.
     */
    public function getActiveDuty () {
        $sql = 'SELECT * FROM duty_tbl WHERE duty_end_date IS NULL';
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
        $sql = 'INSERT INTO duty_tbl (duty_start_date, duty_name) VALUES (:startDate, :name)';
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
        $sql = 'UPDATE duty_tbl SET duty_runup_time = ? WHERE duty_id = ?';
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
        $sql = 'UPDATE duty_tbl SET duty_end_date = ? WHERE duty_id = ?';
        $stmt = $this->pdo->prepare($sql);
        $data = array($endDate, $dutyId);
        return $stmt->execute($data);
    }
}

?>
