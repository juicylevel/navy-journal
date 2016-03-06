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
			'activeDuty' => $this->getActiveDuty()
		);
    }

	/**
	 * Создание боевого дежурства.
	 */
	public function createDuty () {
		$startDate = new DateTime();
		$startDateString = $startDate->format('Y-m-d H:i:s');
		$name = 'Боевое дежурство ' . $startDateString;
		$this->db->createDuty($startDateString, $name);
		return $this->getActiveDuty();
	}

	/**
	 * Завершение подготовки к дежурству.
	 */
	public function completeRunUp () {
		$activeDuty = $this->db->getActiveDuty();
		$startDate = new DateTime($activeDuty->start_date);
		$runUpTime = time() - $startDate->format('U');
		$this->db->saveRunUpTime($activeDuty->id, secondsToTimeString($runUpTime));
		return $this->getActiveDuty();
	}

	/**
	 * Завершение боевого дежурства.
	 */
	public function completeDuty () {
		$activeDuty = $this->db->getActiveDuty();
		$endDate = new DateTime();
		$endDateString = $endDate->format('Y-m-d H:i:s');

		$runUpTime = timeStringToSeconds($activeDuty->runup_time);
		if ($runUpTime == 0) {
			$this->completeRunUp();
		}

		$this->db->saveDutyEndDate($activeDuty->id, $endDateString);
		return $this->getJournalStatus();
	}

	/**
	 * Получение списка боевых дежурств.
	 * @param $offset
	 * @param $pageSize
	 * @param $sort
	 */
	public function getDutyList ($offset, $pageSize, $sort) {
		$dutyListColumns = Settings::getInstance()->getDutyListColumns();

		if (empty($sort)) {
			$sort = array('end_date' => 'DESC');
		}

		$dutyList = $this->db->getDutyList($dutyListColumns, $offset, $pageSize, $sort);

		$dutyList = $this->configureActiveDutyInList($dutyList);

		return array (
			'offset' => $offset,
			'pageSize' => $pageSize,
			'count' => $this->db->getDutyCount(),
			'data' => $dutyList,
			'sort' => $sort
		);
	}

	/**
	 * Получение элементов провизии.
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
	 * Добавление нового элемента провизии.
	 * @param $name Наименование нового элемента провизии.
	 * @param $sort Параметры сортировки списка элементов провизии,
	 * который после добавления будет обновлён и возвращён в ответе.
	 */
	public function addProvisionsItem ($name, $sort) {
		if (!empty($name)) {
			$this->db->addProvisionsItem($name);
		}
		return $this->getProvisionsItems($sort);
	}

	/**
	 * Конфигурация активного дежурства в списке боевых дежурств.
	 * @param $dutyList Список боевых дежурств.
	 * @return $dutyList Модифицированный список боевых дежурств.
	 */
	private function configureActiveDutyInList ($dutyList) {
		$activeDuty = $this->getActiveDuty();
		if (!empty($activeDuty) && !empty($dutyList)) {
			foreach ($dutyList as $key => $duty) {
				if ($activeDuty['dutyId'] == $duty['id']) {
					$duty['activeDuty'] = array(
						'columns' => array('end_date'),
						'duration' => $activeDuty['duration']
					);
					if ($activeDuty['runUpTime'] == 0) {
						$duty['activeDuty']['columns'][] = 'runup_time';
					}
					$dutyList[$key] = $duty;
					break;
				}
			}
		}
		return $dutyList;
	}

	/**
	 * Получение последнего завершённого боевого дежурства.
	 */
	private function getLastCompleteDuty () {
		$result = null;
		$lastCompleteDuty = $this->db->getLastCompleteDuty();

		if (!empty($lastCompleteDuty)) {
			$startDate = new DateTime($lastCompleteDuty->start_date);
			$endDate = new DateTime($lastCompleteDuty->end_date);
			$duration = date_diff($startDate, $endDate);
			$result = array(
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration)
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
			$startDate = new DateTime($activeDuty->start_date);
			$duration = date_diff($startDate, new DateTime());
			$runUpTime = $activeDuty->runup_time;
			$result = array(
				'dutyId' => $activeDuty->id,
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration),
				'runUpTime' => timeStringToSeconds($runUpTime)
			);
		}

		return $result;
	}
}

?>
