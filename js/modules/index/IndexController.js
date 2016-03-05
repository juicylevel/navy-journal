/**
 * Контроллер страницы приложения c таблицей боевых дежурств.
 */
function IndexController (model, view, service) {
	Controller.apply(this, arguments);
};

extend(IndexController, Controller);

/**
 * Получение списка обработчиков оповещений.
 */
IndexController.prototype.getHandlers = function () {
	return Controller.prototype.getHandlers.apply(this, arguments).concat([
		{type: Notifications.LOAD_DUTY_LIST, handler: this.onLoadDutyList},
		{type: Notifications.CHANGE_ACTIVE_DUTY, handler: this.onChangeActiveDuty},
		{type: Notifications.CALL_LOAD_DUTY_LIST, handler: this.onCallLoadDutyList}
	]);
};

/**
 * Обработка события завершения загрузки списка боевых дежурств.
 * @param dutyList Список боевых дежурств.
 */
IndexController.prototype.onLoadDutyList = function (dutyList) {
	this.model.setDutyList(dutyList);
};

/**
 * Обработка события изменения активного дежурства
 * (создание, завершение подготовки, завершение дежурства).
 */
IndexController.prototype.onChangeActiveDuty = function () {
	this.view.refreshDutyList();
};

/**
 * Загрузка списка боевых дежурств.
 * @param options Опции запроса.
 */
IndexController.prototype.onCallLoadDutyList = function (options) {
	this.service.getDutyList(options);
};
