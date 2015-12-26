<?php

header('Content-Type: text/html; charset=utf-8', true);

$valid_passwords = array ("komandir" => "slepen");
$valid_users = array_keys($valid_passwords);

$validated = false;

if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
	$user = $_SERVER['PHP_AUTH_USER'];
	$pass = $_SERVER['PHP_AUTH_PW'];

	$validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);
}

if (!$validated) {
	header('WWW-Authenticate: Basic realm="Zdraviya zhelaem, tovarishch kapitan pervogo ranga"');
 	header('HTTP/1.0 401 Unauthorized');
 	die("Вы не являетесь капитаном первого ранга! Янки гоу хоум!");
}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Журнал</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<link href="img/journal-favicon.ico" rel="shortcut icon" type="image/x-icon">
		<link rel="stylesheet" href="css/style.css">
		<script src="js/scripts.js"></script>
	</head>
	<body>
	</body>
</html>
