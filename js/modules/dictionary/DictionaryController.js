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
		{type: Notifications.CALL_LOAD_PROVISIONS_DATA, handler: this.onCallLoadProvisionsData},
		{type: Notifications.LOAD_PROVISIONS_DATA, handler: this.onLoadProvisionsData},
		{type: Notifications.SAVE_PROVISIONS_ITEM, handler: this.onSaveProvisionsItem},
		{type: Notifications.COMPLATE_SAVE_PROVISIONS_ITEM, handler: this.onCompleteSaveProvisionsItem}
	]);
};

/**
 * Обработка запроса на загрузку информации об элементах и типах провизии.
 * @param options Опции запроса на получение списка элементов провизии (сортировка и пр.).
 */
DictionaryController.prototype.onCallLoadProvisionsData = function (options) {
	if (isEmpty(options)) {
		options = {sort: {name: 'ASC'}};
	}
	this.service.getProvisionsData(options);
};

/**
 * Обработка события завершения загрузки списка элементов провизии.
 * @param provisions Информация для раздела провизии
 * (список элементов провизии, сортировка, список типов провизии).
 */
DictionaryController.prototype.onLoadProvisionsData = function (provisions) {
	var provisionsItems = {data: provisions.data, sort: provisions.sort};
	var provisionsTypes = provisions.types;
	this.model.setProvisionsItems(provisionsItems);
	this.model.setProvisionsTypes(provisionsTypes);
};

/**
 * Обработка оповещения о сохранении элемента провизии.
 * @param data {item: {name: 'Name', id: 1, type_id}, sort: {}}
 */
DictionaryController.prototype.onSaveProvisionsItem = function (data) {
	this.service.saveProvisionsItem(data.item, data.sort);
};

/**
 * Обработка события завершения сохранения элемента провизии на сервере.
 * Обновление списка элементов провизии.
 * @param provisionsItems Список элементов провизии.
 */
DictionaryController.prototype.onCompleteSaveProvisionsItem = function (provisionsItems) {
	this.model.setProvisionsItems(provisionsItems);
	this.view.clearProvisionsItemForm();
};
