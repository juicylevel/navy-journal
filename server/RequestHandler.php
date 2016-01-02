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
        $lastCompleteDuty = $this->db->getLastCompleteDuty();
		$result = array();

        if (!empty($lastCompleteDuty)) {
			$startDate = new DateTime($lastCompleteDuty->duty_start_date);
			$endDate = new DateTime($lastCompleteDuty->duty_end_date);

			$duration = date_diff($startDate, $endDate);

			$result['lastDuty'] = array(
				'date' => $startDate->format('U'),
				'duration' => dateIntervalToSeconds($duration)
			);
        } else {
			$result['lastDuty'] = null;
		}

        return $result;
    }

	/**
	 * Создание боевого дежурства.
	 */
	public function createDuty () {
		$startDate = date('Y-m-d H:i:s');
		$name = 'Боевое дежурство ' . $startDate;

		$dutyId = $this->db->createDuty($startDate, $name);
		$result = array('dutyId' => $dutyId, 'name' => $name);

		return $result;
	}
}

?>
