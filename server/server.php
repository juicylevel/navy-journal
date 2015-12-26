<?php

// заголовки
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=utf-8');

// скрипты
require_once 'RequestHandler.php';

// глобальные настройки
date_default_timezone_set('Europe/Moscow');

// глобальный обработчик ошибок для централизованной
// обработки сообщений warning, notice и error
function globalErrorHandler ($errno, $errstr, $errfile, $errline) {
	$errorResponse = array(
		'error' => $errstr . ' file: ' . $errfile . ', line: ' . $errline
	);
	// останавливаем выполнение скрипта и формируем json-ответ с
	// информацией об ошибке
	die(json_encode($errorResponse, JSON_NUMERIC_CHECK));
}

// включаем обработку только run-time errors (throw new Exception) для того,
// чтобы в ответ не попадали остальные стандартные html-сообщения,
// так как для клиента нужен json-ответ
// P.S.: дополнительно для централизованной обработки warning, notice и error:
// - вместо throw new Exception() в системе используется trigger_error
// - для БД установлен PDO::ERRMODE_WARNING в DataBase.php
error_reporting(E_ERROR);
set_error_handler('globalErrorHandler');

// получение информации о запросе
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod == 'GET') {
	$requestData = $_GET;
} else if ($requestMethod == 'POST') {
	$postBody = @file_get_contents('php://input');
	$requestData = json_decode($postBody, true);
}

extract($requestData);

// обработка запроса
$requestHandler = new RequestHandler();

switch ($request) {
	case 'getJournalStatus':
		$result = $requestHandler->getJournalStatus();
		break;
	case 'createDuty':
		$result = $requestHandler->createDuty();
		break;
	default:
		trigger_error('Unknow method "' . $request . '"', E_USER_ERROR);
}

// формирование ответа при успешном выполнении запроса
$response = array('apiMethod' => $request, 'result' => $result);
echo json_encode($response, JSON_NUMERIC_CHECK);

?>
