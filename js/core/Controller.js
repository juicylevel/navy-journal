/**
 * Базовый класс контроллера.
 * Выполняет обработку оповещений-комманд.
 * Имеет доступ к модели, представлению и сервису.
 */
function Controller (model, view, service) {
	Receiver.apply(this, arguments);

	this.model = model;
	this.view = view;
	this.service = service;
};

extend(Controller, Receiver);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
Controller.prototype.getHandlers = function () {
	return [
		{type: VIEW_READY, handler: this.init}
	];
};

/**
 * Инициализация контроллера.
 */
Controller.prototype.init = function () {

};
