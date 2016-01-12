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
		// service handlers
		{type: LOAD_CONFIG_COMPLETE, handler: this.onLoadConfig},
		{type: LOAD_JOURNAL_STATUS, handler: this.onLoadJournalStatus},
		{type: CREATE_DUTY_COMPLETE, handler: this.onCreateDutyComplete},
		{type: RUN_UP_COMPLETE, handler: this.onRunUpComplete},
		{type: DUTY_COMPLETE, handler: this.onDutyComplete},

		// system menu handlers
		{type: CALL_START_DUTY, handler: this.onCallStartDuty},
		{type: CALL_COMPLETE_RUN_UP, handler: this.onCallCompleteRunUp},
		{type: CALL_COMPLETE_DUTY, handler: this.onCallCompleteDuty},

		// module menu handlers
		{type: CALL_DUTY_MODULE, handler: this.onCallDutyModule},
		{type: CALL_STATISTICS_MODULE, handler: this.onCallStatisticsModule},
		{type: CALL_DATA_MANAGEMENT_MODULE, handler: this.onCallDataManagementModule}
	]);
};

/**
 * Инициализация.
 */
JournalController.prototype.init = function () {
	this.service.loadConfig('config.json');
};

//------------------------------------------------------------------------------
// service handlers
//------------------------------------------------------------------------------

/**
 * Обработка оповещения о загрузки конфигурации приложения.
 * @param config Конфигурация приложения.
 */
JournalController.prototype.onLoadConfig = function (config) {
	Settings.getInstance().config = config;
	this.service.getJournalStatus();
};

/**
 * Обработка оповещения о загрузки статуса журнала.
 * @param journalStatus Статус журнала.
 */
JournalController.prototype.onLoadJournalStatus = function (journalStatus) {
	this.model.setJournalStatus(journalStatus);

	this.model.updateSystemMenu();

	var moduleMenu = this.model.getModuleMenu();
	this.model.setCurrentModuleMenu(moduleMenu);
};

/**
 * Обработка оповещения о завершении создания боевого дежурства на сервере.
 * @param createdDuty Информация созданном дежурстве.
 */
JournalController.prototype.onCreateDutyComplete = function (createdDuty) {
	this.model.setActiveDuty(createdDuty);
	this.model.updateSystemMenu();
};

/**
 * Обработка события завершения подготовки к дежурству на сервере.
 * @param activeDuty Информация об активном (текущем) дежурстве.
 */
JournalController.prototype.onRunUpComplete = function (activeDuty) {
	this.model.setActiveDuty(activeDuty);
	this.model.updateSystemMenu();
};

/**
 * Обработка события завершения дежурства на сервере.
 * @param journalStatus Статус журнала.
 */
JournalController.prototype.onDutyComplete = function (journalStatus) {
	this.onLoadJournalStatus(journalStatus);
};

//------------------------------------------------------------------------------
// system menu handlers
//------------------------------------------------------------------------------

/**
 * Обработка события запуска боевого дежурства.
 */
JournalController.prototype.onCallStartDuty = function () {
	this.service.createDuty();
};

/**
 * Обработка события завершения подготовки к дежурству.
 */
JournalController.prototype.onCallCompleteRunUp = function () {
	Dialog.getInstance().show(Settings.getInstance().config.dialogs.completeRunUp, {
		context: this,
		'Да': function () {
			this.service.completeRunUp();
		},
		'Нет': null
	});
};

/**
 * Обработка события завершения дежурства.
 */
JournalController.prototype.onCallCompleteDuty = function () {
	Dialog.getInstance().show(Settings.getInstance().config.dialogs.completeDuty, {
		context: this,
		'Да': function () {
			this.service.completeDuty();
		},
		'Нет': null
	});
};

//------------------------------------------------------------------------------
// module menu handlers
//------------------------------------------------------------------------------

/**
 * Обработка события показа модуля с таблицей боевых дежурств.
 */
JournalController.prototype.onCallDutyModule = function () {
	ModuleManager.getInstance().getModule(DUTY);
};

/**
 * Обработка события показа модуля статистики.
 */
JournalController.prototype.onCallShowStatistics = function () {
	ModuleManager.getInstance().getModule(STATISTICS);
};

/**
 * Обработка события показа модуля управления данными.
 */
JournalController.prototype.onCallShowDataManagement = function () {
	ModuleManager.getInstance().getModule(DATA_MANAGEMENT);
};
