<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Moscow');


function error_handler($errno, $errstr, $errfile, $errline) {
    throw new Exception($errstr . ' file: ' . $errfile . ', line: ' . $errline);
}

set_error_handler('error_handler', E_ALL);

require_once 'RequestHandler.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
if ($requestMethod == 'GET') {
	$requestData = $_GET;
} else if ($requestMethod == 'POST') {
	$postBody = @file_get_contents('php://input');
	$requestData = json_decode($postBody, true);
}

extract($requestData);

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
		$result = $requestHandler->getDutyList($offset, $pageSize, json_decode($sort, true));
		break;
	case 'getProvisionsData':
		$result = $requestHandler->getProvisionsData(json_decode($sort, true));
		break;
	case 'getProvisionsItems':
		$result = $requestHandler->getProvisionsItems(json_decode($sort, true));
		break;
	case 'saveProvisionsItem':
		$result = $requestHandler->saveProvisionsItem($item, $sort);
		break;
	case 'getAccumulators':
		$result = $requestHandler->getAccumulators(json_decode($sort, true));
		break;
	case 'saveAccumulator':
		$result = $requestHandler->saveAccumulator($item, $sort);
		break;
	default:
		trigger_error('Unknow method "' . $request . '"', E_USER_ERROR);
}

//sleep(1);

$response = array('apiMethod' => $request, 'result' => $result);
echo json_encode($response, JSON_NUMERIC_CHECK);

?>
