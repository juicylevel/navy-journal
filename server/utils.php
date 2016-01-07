<?php

/**
 * Нативная функция date_diff возвращает объект DateInterval.
 * Метод преобразует объект DateInterval в секунды.
 * @param $dateInterval Объект DateInterval.
 * @return int Интервал времени в секундах.
 */
function dateIntervalToSeconds ($dateInterval)  {
    return ($dateInterval->y * 365 * 24 * 60 * 60) + // TODO: опасно! 365 дней указано, количество дней в году может быть разным
           ($dateInterval->m * 30 * 24 * 60 * 60) +
           ($dateInterval->d * 24 * 60 * 60) +
           ($dateInterval->h * 60 * 60) +
           ($dateInterval->i * 60) +
           ($dateInterval->s);
}

/**
 * Перевод секунд в строку времени формата hh:mm:ss.
 * @param $time Общее количество секунд.
 * @return string Cтрока времени в формате hh:mm:ss.
 */
function secondsToTimeString ($time) {
    $hours = formatDoubleDigit(floor($time / 3600));
    $minutes = formatDoubleDigit(floor(($time / 60) % 60));
    $seconds = formatDoubleDigit($time % 60);
    return $hours . ':' . $minutes . ':' . $seconds;
}

/**
 * Перевод строки времени в формате hh:mm:ss в секунды.
 * @param $hhmmss Строка времени в формате hh:mm:ss.
 * @return int Секунды.
 */
function timeStringToSeconds($hhmmss) {
    $time = explode(':', $hhmmss);
    return ($time[0] * 3600) + ($time[1] * 60) + $time[2];
}

/**
 * Преобразование однозначного числа в двузначный строковый
 * эквивалент типа 0x (7 в "07").
 * @param $number Число.
 * @return string Если $number однозначное число, то функция вернёт $number
 * двузначный строковый эквивалент типа 0x (7 в "07").
 */
function formatDoubleDigit ($number) {
	return $number < 10 ? '0' . $number : $number;
}

?>
