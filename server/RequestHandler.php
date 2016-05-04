<?php

require_once 'utils.php';
require_once 'DataBase.php';
require_once 'Settings.php';

/**
 * Обработка запросов с клиента.
 */
class RequestHandler {
    /**
	 * Объект для работы с БД.
	 */
	private $db;

	/**
	 * Создание объекта для работы с БД.
	 */
	public function __construct() {
		$this->db = new DataBase();
	}

    /**
     * Получение статуса журнала.
     */
    public function getJournalStatus () {
		return array(
			'lastDuty' => $this->getLastCompleteDuty(),
			'activeDuty' => $this->getActiveDuty(),
            'weather' => $this->getWeatherFromService()
		);
    }

	/**
	 * Создание боевого дежурства.
	 */
	public function createDuty () {
		$name = 'Боевое дежурство ' . (new DateTime())->format('d.m.Y H:i:s');

        $weather = $this->getWeatherFromService();
        $meteoId = $this->db->addMeteoData($weather);

        $this->db->createDuty($name, $meteoId);

		return $this->getActiveDuty();
	}

	/**
	 * Завершение подготовки к дежурству.
	 */
	public function completeRunUp () {
		$activeDuty = $this->db->getActiveDuty();
		$runUpTime = time() - $activeDuty->start_date;
		$this->db->saveRunUpTime($activeDuty->id, $runUpTime);
		return $this->getActiveDuty();
	}

	/**
	 * Завершение боевого дежурства.
	 */
	public function completeDuty () {
		$activeDuty = $this->db->getActiveDuty();

		if (empty($activeDuty->runup_time)) {
			$this->completeRunUp();
		}

		$this->db->saveDutyEndDate($activeDuty->id);

		return $this->getJournalStatus();
	}

	/**
	 * Получение списка боевых дежурств.
	 * @param $offset
	 * @param $pageSize
	 * @param $sort
	 */
	public function getDutyList ($offset, $pageSize, $sort) {
		if (empty($sort)) {
			$sort = array('end_date' => 'DESC');
		}

		$dutyList = $this->db->getDutyList($offset, $pageSize, $sort);
		$activeDuty = $this->db->getActiveDuty();
		$count = $this->db->getDutyTotal();

		if (!empty($activeDuty) && !empty($dutyList)) {
			foreach ($dutyList as $key => $duty) {
				if ($activeDuty->id == $duty['id']) {
					$duty['activeDuty'] = true;
					$dutyList[$key] = $duty;
					break;
				}
			}
		}

		return array (
			'offset' => $offset,
			'pageSize' => $pageSize,
			'count' => $count,
			'data' => $dutyList,
			'sort' => $sort
		);
	}

	/**
	 * Получение информации об элементах и типах провизии.
	 * @param $sort Параметры сортировки.
	 */
	public function getProvisionsData ($sort) {
		$provisionsItems = $this->db->getProvisionsItems($sort);
		$types = $this->db->getProvisionsTypes();

		return array (
			'data' => $provisionsItems,
			'sort' => $sort,
			'types' => $types
		);
	}

	/**
	 * Получение списка элементов провизии.
	 * @param $sort Параметры сортировки.
	 */
	public function getProvisionsItems ($sort) {
		$provisionsItems = $this->db->getProvisionsItems($sort);

		return array (
			'data' => $provisionsItems,
			'sort' => $sort
		);
	}

	/**
	 * Сохранение элемента провизии.
	 * @param $item Элемент провизии.
	 * @param $sort Параметры сортировки списка элементов провизии,
	 * который после сохранения будет обновлён и возвращён в ответе.
	 */
	public function saveProvisionsItem ($item, $sort) {
		if (empty($item['id'])) {
			$this->db->addProvisionsItem($item);
		} else {
			$this->db->updateProvisionsItem($item);
		}
		return $this->getProvisionsItems($sort);
	}

	/**
	 * Получение списка аккумуляторов.
	 * @param $sort Параметры сортировки.
	 */
	public function getAccumulators ($sort) {
		$accumulators = $this->db->getAccumulators($sort);

		return array (
			'data' => $accumulators,
			'sort' => $sort
		);
	}

	/**
	 * Сохранение аккумулятора.
	 * @param $item Данные об аккумуляторе.
	 * @param $sort Параметры сортировки списка аккумуляторов,
	 * который после сохранения будет обновлён и возвращён в ответе.
	 */
	public function saveAccumulator ($item, $sort) {
		if (empty($item['id'])) {
			$this->db->addAccumulator($item);
		} else {
			$this->db->updateAccumulator($item);
		}
		return $this->getAccumulators($sort);
	}

	/**
	 * Получение последнего завершённого боевого дежурства.
	 */
	private function getLastCompleteDuty () {
		$result = null;
		$lastCompleteDuty = $this->db->getLastCompleteDuty();

		if (!empty($lastCompleteDuty)) {
			$startDate = $lastCompleteDuty->start_date;
			$endDate = $lastCompleteDuty->end_date;
			$duration = $endDate - $startDate;
			$result = array(
				'date' => $startDate,
				'duration' => $duration
			);
		}

		return $result;
	}

	/**
	 * Получение активного (текущего) боевого дежурства.
	 */
	private function getActiveDuty () {
		$result = null;
		$activeDuty = $this->db->getActiveDuty();

		if (!empty($activeDuty)) {
			$startDate = $activeDuty->start_date;
			$duration = time() - $startDate;
			$runUpTime = $activeDuty->runup_time;
			$result = array(
				'dutyId' => $activeDuty->id,
				'date' => $startDate,
				'duration' => $duration,
				'runUpTime' => $runUpTime
			);
		}

		return $result;
	}

	/**
	 * Получение параметров погоды из сервиса.
     * http://api.openweathermap.org
     * CITYID = 498817
     * APIID = a61d94e24a6ea5c6adca71cd69256c39 (juicylevel, epictrain)
	 */
	private function getWeatherFromService () {
        try {
            $serviceUrl = "http://api.openweathermap.org/data/2.5/weather?id=498817&APPID=a61d94e24a6ea5c6adca71cd69256c39&lang=ru&mode=xml&units=metric";
    		$response = sendRequest($serviceUrl);
    		$serviceData = xmlstring2array($response);

    		$weather = array(
    			'temperature' => $serviceData['temperature']['@attributes']['value'],
    			'humidity' => $serviceData['humidity']['@attributes']['value'],
                'pressure' => round($serviceData['pressure']['@attributes']['value'] * 0.75006375541921),
                'wind_speed' => $serviceData['wind']['speed']['@attributes']['value'],
                'wind_direction' => Settings::getInstance()->getWindDirection($serviceData['wind']['direction']['@attributes']['code'])['code'],
                'weather_condition' => Settings::getInstance()->getWeatherCondition(substr($serviceData['weather']['@attributes']['icon'], 0, -1))['code']
                //'lastupdate' => (new DateTime($serviceData['lastupdate']['@attributes']['value']))->format('U')
    		);
        } catch (Exception $exception) {
            $weather = array();
        }

        return $weather;
	}
}

?>
