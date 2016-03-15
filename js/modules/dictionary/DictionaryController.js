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
		{type: Notifications.ADD_PROVISIONS_ITEM, handler: this.onAddProvisionsItem},
		{type: Notifications.COMPLATE_ADD_PROVISIONS_ITEM, handler: this.onCompleteAddProvisionsItem}
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
