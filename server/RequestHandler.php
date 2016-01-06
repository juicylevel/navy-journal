<?php

require_once 'utils.php';
require_once 'DataBase.php';

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
		$result = array('lastDuty' => null, 'activeDuty' => null);

        $lastCompleteDuty = $this->db->getLastCompleteDuty();
		$activeDuty = $this->db->getActiveDuty();

        if (!empty($lastCompleteDuty)) {
			$startDate = new DateTime($lastCompleteDuty->duty_start_date);
			$endDate = new DateTime($lastCompleteDuty->duty_end_date);
			$duration = date_diff($startDate, $endDate);
			$result['lastDuty'] = array(
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration)
			);
        }

		if (!empty($activeDuty)) {
			$startDate = new DateTime($activeDuty->duty_start_date);
			$duration = date_diff($startDate, new DateTime());
			$runUpTime = $activeDuty->duty_runup_time;
			$result['activeDuty'] = array(
				'dutyId' => $activeDuty->duty_id,
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration),
				'runUpTime' => strtotime('1970-01-01 $runUpTime UTC')
			);
		}

        return $result;
    }

	/**
	 * Создание боевого дежурства.
	 */
	public function createDuty () {
		$startDate = new DateTime();
		$startDateString = $startDate->format('Y-m-d H:i:s');
		$name = 'Боевое дежурство ' . $startDateString;

		$dutyId = $this->db->createDuty($startDateString, $name);
		$result = array(
			'dutyId' => $dutyId,
			'name' => $name,
			'startDate' => $startDate->format('U')
		);

		return $result;
	}
}

?>
