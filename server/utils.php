<?php

function sendRequest ($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

function xmlstring2array ($string) {
    $xml = simplexml_load_string($string, 'SimpleXMLElement', LIBXML_NOCDATA);
    $array = json_decode(json_encode((array)$xml), TRUE);
    return $array;
}

?>
