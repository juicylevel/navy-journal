function IndexController (model, view, service) {
	Controller.apply(this, arguments);
};

extend(IndexController, Controller);

/**
 * Получение списка обработчиков оповещений.
 */
IndexController.prototype.getHandlers = function () {
	return Controller.prototype.getHandlers.apply(this, arguments).concat([
		// service handlers
		{type: LOAD_DUTY_LIST, handler: this.onLoadDutyList},

		// view handlers
		{type: CALL_LOAD_DUTY_LIST, handler: this.onCallLoadDutyList}
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
 * Загрузка списка боевых дежурств.
 */
IndexController.prototype.onCallLoadDutyList = function (dutyListOptions) {
	this.service.getDutyList(dutyListOptions);
};
