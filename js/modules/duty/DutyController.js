/**
 * Контроллер модуля для управления списком боевых дежурств.
 */
function DutyController (model, view, service) {
	Controller.apply(this, arguments);
};

extend(DutyController, Controller);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
DutyController.prototype.getHandlers = function () {
	return Controller.prototype.getHandlers.apply(this, arguments).concat([
		// service handlers


		// view handlers

	]);
};

/**
 * Инициализация контроллера.
 */
DutyController.prototype.init = function () {

};
