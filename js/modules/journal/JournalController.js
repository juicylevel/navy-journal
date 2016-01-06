/**
 * Контроллер журнала.
 */
function JournalController (model, view, service) {
	Controller.apply(this, arguments);
};

extend(JournalController, Controller);

/**
 * Получение списка обработчиков оповещений.
 */
JournalController.prototype.getHandlers = function () {
	return Controller.prototype.getHandlers.apply(this, arguments).concat([
		{type: LOAD_CONFIG_COMPLETE, handler: this.onLoadConfig},
		{type: LOAD_JOURNAL_STATUS, handler: this.onLoadJournalStatus},
		{type: CREATE_DUTY_COMPLETE, handler: this.onCreateDutyComplete},
		{type: START_DUTY, handler: this.onStartDuty},
		{type: SHOW_JOURNAL, handler: this.onShowJournal},
		{type: SELECT_MENU_ITEM, handler: this.onSelectMenuItem}
	]);
};

/**
 * Инициализация.
 */
JournalController.prototype.init = function () {
	this.service.loadConfig('config.json');
};

/**
 * Обработка оповещения о загрузки конфигурации приложения.
 */
JournalController.prototype.onLoadConfig = function (config) {
	Settings.getInstance().config = config;
	this.service.getJournalStatus();
};

/**
 * Обработка оповещения о загрузки статуса журнала.
 */
JournalController.prototype.onLoadJournalStatus = function (journalStatus) {
	this.model.setJournalStatus(journalStatus);

	var journalMenu = this.model.getModuleMenu();
	this.model.createCurrentMenu(journalMenu);
};

/**
 * Обработка оповещения о завершении создания боевого дежурства.
 */
JournalController.prototype.onCreateDutyComplete = function (duty) {

};

/**
 * Обработка события запуска боевого дежурства.
 */
JournalController.prototype.onStartDuty = function () {
	this.service.createDuty();
};

/**
 * Обработка события показа интерфейса журнала.
 */
JournalController.prototype.onShowJournal = function () {
	console.log('onShowJournal');
};

/**
 * Обработка события завершения подготовки к дежурству.
 */
JournalController.prototype.onCompleteRunUp = function () {
	this.service.completeRunUp();
};

/**
 * Обработка события выбора пункта меню.
 */
JournalController.prototype.onSelectMenuItem = function (menuItem) {
	if (!isEmpty(menuItem.system)) {
		var handlerName = 'on' + capitalize(menuItem.command);
		this[handlerName].call(this);
	} else {

	}
};
