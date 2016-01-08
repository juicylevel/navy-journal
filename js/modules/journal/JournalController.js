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
		{type: SELECT_SYSTEM_MENU_ITEM, handler: this.onSelectSystemMenuItem},
		{type: SELECT_MODULE_MENU_ITEM, handler: this.onSelectModuleMenuItem}
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

	this.model.updateSystemMenu();

	var moduleMenu = this.model.getModuleMenu();
	this.model.setCurrentModuleMenu(moduleMenu);
};

/**
 * Обработка оповещения о завершении создания боевого дежурства.
 */
JournalController.prototype.onCreateDutyComplete = function (duty) {

};

/**
 * Обработка события выбора пункта системного меню.
 * @param menuItem Выбранный пункт меню.
 */
JournalController.prototype.onSelectSystemMenuItem = function (menuItem) {
	var handlerName = 'on' + capitalize(menuItem.command);
	this[handlerName].call(this);
};

/**
 * Обработка события выбора пункта меню модуля.
 * @param menuItem Выбранный пункт меню.
 */
JournalController.prototype.onSelectModuleMenuItem = function (menuItem) {
	console.log('onSelectModuleMenuItem', menuItem.label, menuItem.command);
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
 * Обработка события завершения дежурства.
 */
JournalController.prototype.onCompleteDuty = function () {
	console.log('onCompleteDuty');
};
