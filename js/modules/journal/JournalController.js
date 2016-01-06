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
		{type: CALL_START_DUTY, handler: this.onCallStartDuty},
		{type: CALL_SHOW_JOURNAL, handler: this.onCallShowJournal}
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
};

/**
 * Обработка оповещения о завершении создания боевого дежурства.
 */
JournalController.prototype.onCreateDutyComplete = function (duty) {

};

/**
 * Обработка события запуска боевого дежурства.
 */
JournalController.prototype.onCallStartDuty = function () {
	this.service.createDuty();
};

/**
 * Обработка события показа интерфейса журнала.
 */
JournalController.prototype.onCallShowJournal = function () {
	
};
