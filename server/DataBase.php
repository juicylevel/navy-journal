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
        $mysql_host = "127.0.0.1";
        $mysql_database = "journal";
        $mysql_user = "root";
        $mysql_password = "";

        $this->pdo = new PDO(
            'mysql:host=' . $mysql_host . ';dbname=' . $mysql_database,
            $mysql_user,
            $mysql_password,
            array(
                PDO::ATTR_PERSISTENT => TRUE,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
            )
        );
    }

    /**
     * Получение информации о последнем завершённом дежурстве.
     */
    public function getLastCompleteDuty () {
        $sql = 'SELECT * FROM duty_tbl WHERE duty_end_date IS NOT NULL';
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
