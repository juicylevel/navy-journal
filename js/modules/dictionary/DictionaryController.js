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
		{type: Notifications.CALL_LOAD_PROVISIONS_ITEMS, handler: this.onCallLoadProvisionsItems},
		{type: Notifications.LOAD_PROVISIONS_ITEMS, handler: this.onLoadProvisionsItems},
		{type: Notifications.ADD_PROVISIONS_ITEM, handler: this.onAddProvisionsItem},
		{type: Notifications.COMPLATE_ADD_PROVISIONS_ITEM, handler: this.onCompleteAddProvisionsItem}
	]);
};

/**
 * Обработка запроса на загрузку элементов провизии.
 * @param options Опции запроса на получение списка элементов провизии (сортировка и пр.).
 */
DictionaryController.prototype.onCallLoadProvisionsItems = function (options) {
	if (isEmpty(options)) {
		options = {sort: {name: 'ASC'}};
	}
	this.service.getProvisionsItems(options);
};

/**
 * Обработка события завершения загрузки списка элементов провизии.
 * @param provisionsItems Список элементов провизии.
 */
DictionaryController.prototype.onLoadProvisionsItems = function (provisionsItems) {
	this.model.setProvisionsItems(provisionsItems);
};

/**
 * Обработка оповещения о добавлении нового элемента провизии.
 * @param payload Наименование нового элемента провизии и опции запроса на
 * получение в ответ обновлённго списка элементов провизии (сортировка и пр.).
 */
DictionaryController.prototype.onAddProvisionsItem = function (payload) {
	this.service.addProvisionsItem(payload.name, payload.sort);
};

/**
 * Обработка события завершения добавления нового элемента провизии на сервере.
 * Обновление списка элементов провизии.
 * @param provisionsItems Список элементов провизии.
 */
DictionaryController.prototype.onCompleteAddProvisionsItem = function (provisionsItems) {
	this.model.setProvisionsItems(provisionsItems);
};
