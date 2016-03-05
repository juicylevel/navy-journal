/**
 * Контроллер модуля управления справочными даными.
 */
function DictionaryController (model, view, service) {
	Controller.apply(this, arguments);
};

extend(DictionaryController, Controller);

/**
 * Получение списка обработчиков оповещений.
 */
DictionaryController.prototype.getHandlers = function () {
	return Controller.prototype.getHandlers.apply(this, arguments).concat([
		{type: Notifications.CALL_LOAD_PROVISIONS_TYPES, handler: this.onCallLoadProvisionsTypes},
		{type: Notifications.LOAD_PROVISIONS_TYPES, handler: this.onLoadProvisionsTypes}
	]);
};

/**
 * Обработка запроса на загрузку типов провизии.
 * @param options Опции запроса.
 */
DictionaryController.prototype.onCallLoadProvisionsTypes = function (options) {
	if (isEmpty(options)) {
		options = {sort: {provisions_type_name: 'ASC'}};
	}
	this.service.getProvisionsTypes(options);
};

/**
 * Обработка события завершения загрузки списка типов провизии.
 * @param dutyList Список боевых дежурств.
 */
DictionaryController.prototype.onLoadProvisionsTypes = function (provisionsTypes) {
	this.model.setProvisionsTypes(provisionsTypes);
};
