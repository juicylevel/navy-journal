/**
 * Обозреватель событий.
 */
function Receiver () {
	Dispatcher.apply(this, arguments);
}

extend(Receiver, Dispatcher);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
Receiver.prototype.getHandlers = function () {
	return null;
}
