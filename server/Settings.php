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
     * Получение информации о направлении ветра по коду.
     * @param $serviceCode Код направления ветра, зарегистрированный в сервисе,
     * предоставляющего информацию о погоде.
     * @return assoc array
     */
    public function getWindDirection ($serviceCode) {
        $directions = $this->config['meta']['windDirections'];
        foreach ($directions as $key => $direction) {
            if (in_array($serviceCode, $direction['serviceCode'])) {
                return $direction;
            }
        }
    }

    /**
     * Получение информации о погоде по коду.
     * @param $serviceCode Код состояния погоды, зарегистрированный в сервисе,
     * предоставляющего информацию о погоде.
     * @return assoc array
     */
    public function getWeatherCondition ($serviceCode) {
        $weatherConditions = $this->config['meta']['weatherConditions'];
        foreach ($weatherConditions as $key => $weatherCondition) {
            if (in_array($serviceCode, $weatherCondition['serviceCode'])) {
                return $weatherCondition;
            }
        }
    }
}

?>
