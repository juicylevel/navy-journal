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
     */
    public function createDuty ($startDate, $name) {
        $sql = 'INSERT INTO duty_tbl (duty_start_date, duty_name) VALUES (:startDate, :name)';
        $stmt = $this->pdo->prepare($sql);
        $data = array(':startDate' => $startDate, ':name' => $name);
        $result = $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }
}

?>
