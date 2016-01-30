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
		$startDate = new DateTime($activeDuty->duty_start_date);
		$runUpTime = time() - $startDate->format('U');
		$this->db->saveRunUpTime($activeDuty->duty_id, secondsToTimeString($runUpTime));
		return $this->getActiveDuty();
	}

	/**
	 * Завершение боевого дежурства.
	 */
	public function completeDuty () {
		$activeDuty = $this->db->getActiveDuty();
		$endDate = new DateTime();
		$endDateString = $endDate->format('Y-m-d H:i:s');

		$runUpTime = timeStringToSeconds($activeDuty->duty_runup_time);
		if ($runUpTime == 0) {
			$this->completeRunUp();
		}

		$this->db->saveDutyEndDate($activeDuty->duty_id, $endDateString);
		return $this->getJournalStatus();
	}

	/**
	 * Получение списка боевых дежурств.
	 * @param $offset
	 * @param $pageSize
	 */
	public function getDutyList ($offset, $pageSize, $sort) {
		$dutyListColumns = Settings::getInstance()->getDutyListColumns();

		if (empty($sort)) {
			$sort = array('duty_end_date' => 'DESC');
		}

		return array (
			'offset' => $offset,
			'pageSize' => $pageSize,
			'count' => $this->db->getDutyCount(),
			'data' => $this->db->getDutyList($dutyListColumns, $offset, $pageSize, $sort),
			'sort' => $sort
		);
	}

	/**
	 * Получение последнего завершённого боевого дежурства.
	 */
	private function getLastCompleteDuty () {
		$result = null;
		$lastCompleteDuty = $this->db->getLastCompleteDuty();

		if (!empty($lastCompleteDuty)) {
			$startDate = new DateTime($lastCompleteDuty->duty_start_date);
			$endDate = new DateTime($lastCompleteDuty->duty_end_date);
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
			$startDate = new DateTime($activeDuty->duty_start_date);
			$duration = date_diff($startDate, new DateTime());
			$runUpTime = $activeDuty->duty_runup_time;
			$result = array(
				'dutyId' => $activeDuty->duty_id,
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration),
				'runUpTime' => timeStringToSeconds($runUpTime)
			);
		}

		return $result;
	}
}

?>
