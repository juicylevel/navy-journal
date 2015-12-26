/**
 * Базовый класс модели данных.
 * Определяет состояние представления, является источником данных для их отображения пользователю.
 * Оповещает об изменениях данных.
 */
function Model () {
	Dispatcher.apply(this, arguments);
}

extend(Model, Dispatcher);
