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

// обработка fatal errors и прочих исключительных ситуаций,
// которые не обрабатываются в set_error_handler
function shutdownHandler() {
    $error = error_get_last();
    if (!empty($error)) {
		$errorMessage = $error['message'] . ' file: ' . $error['file'] . ', line: ' . $error['line'];
		$errorResponse = array(
			// на локальном сервере в ос windows проблемы с кодировками в сообщениях об ошибках
			'error' => iconv('cp1251', 'utf-8', $errorMessage)
		);
		// останавливаем выполнение скрипта и формируем json-ответ с
		// информацией об ошибке
		die(json_encode($errorResponse, JSON_NUMERIC_CHECK));
    }
}

// включаем обработку и вывод ошибок для того,
// чтобы в ответ не попадали стандартные html-сообщения формируемые сервером,
// так как для клиента нужен json-ответ
// P.S.: дополнительно для централизованной обработки warning, notice и error:
// - вместо throw new Exception() в системе используется trigger_error
// - для БД установлен PDO::ERRMODE_WARNING в DataBase.php
error_reporting(NULL);
set_error_handler('globalErrorHandler');
register_shutdown_function('shutdownHandler');

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
	case 'completeRunUp':
		$result = $requestHandler->completeRunUp();
		break;
	case 'completeDuty':
		$result = $requestHandler->completeDuty();
		break;
	case 'getDutyList':
		$result = $requestHandler->getDutyList($offset, $pageSize);
		break;
	default:
		trigger_error('Unknow method "' . $request . '"', E_USER_ERROR);
}

//sleep(1);

// формирование ответа при успешном выполнении запроса
$response = array('apiMethod' => $request, 'result' => $result);
echo json_encode($response, JSON_NUMERIC_CHECK);

?>
