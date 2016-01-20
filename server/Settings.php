<?php

class Settings {
    private static $instance = null;

    private $config;

    /**
     * Конструктор.
     */
    private function __construct() {
        $jsonString = file_get_contents('../config.json');
        $this->config = json_decode($jsonString, true);
    }

    /**
     * Получение экзепляра Settings.
     */
    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * @private
     */
    private function __clone() {

    }

    /**
     * Получение колонок таблицы боевых дежурств.
     */
    public function getDutyListColumns () {
        return array_keys($this->config['meta']['dutyGridColumns']);
    }
}

?>
