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
		{type: Notifications.LOAD_CONFIG_COMPLETE, handler: this.onLoadConfig},
		{type: Notifications.LOAD_JOURNAL_STATUS, handler: this.onLoadJournalStatus},
		{type: Notifications.CREATE_DUTY_COMPLETE, handler: this.onCreateDutyComplete},
		{type: Notifications.RUN_UP_COMPLETE, handler: this.onRunUpComplete},
		{type: Notifications.DUTY_COMPLETE, handler: this.onDutyComplete},
		{type: Notifications.DUTY_COMPLETE, handler: this.onDutyComplete},

		// system menu handlers
		{type: Notifications.CALL_START_DUTY, handler: this.onCallStartDuty},
		{type: Notifications.CALL_COMPLETE_RUN_UP, handler: this.onCallCompleteRunUp},
		{type: Notifications.CALL_COMPLETE_DUTY, handler: this.onCallCompleteDuty},

		// module menu handlers
		{type: Notifications.CALL_INDEX_MODULE, handler: this.onCallIndexModule},
		{type: Notifications.CALL_DUTY_MODULE, handler: this.onCallDutyModule},
		{type: Notifications.CALL_STATISTICS_MODULE, handler: this.onCallStatisticsModule},
		{type: Notifications.CALL_DICTIONARY_MODULE, handler: this.onCallDictionaryModule}
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

	this.onCallIndexModule();
};

/**
 * Обработка оповещения о завершении создания боевого дежурства на сервере.
 * @param createdDuty Информация созданном дежурстве.
 */
JournalController.prototype.onCreateDutyComplete = function (createdDuty) {
	this.model.setActiveDuty(createdDuty);
	Bus.getInstance().sendNotification(new Notification(Notifications.CHANGE_ACTIVE_DUTY));
};

/**
 * Обработка события завершения подготовки к дежурству на сервере.
 * @param activeDuty Информация об активном (текущем) дежурстве.
 */
JournalController.prototype.onRunUpComplete = function (activeDuty) {
	this.model.setActiveDuty(activeDuty);
	Bus.getInstance().sendNotification(new Notification(Notifications.CHANGE_ACTIVE_DUTY));
};

/**
 * Обработка события завершения дежурства на сервере.
 * @param journalStatus Статус журнала.
 */
JournalController.prototype.onDutyComplete = function (journalStatus) {
	this.onLoadJournalStatus(journalStatus);
	Bus.getInstance().sendNotification(new Notification(Notifications.CHANGE_ACTIVE_DUTY));
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
	Dialog.getInstance().show('Завершение подготовки к дежурству',
		Settings.getInstance().getCompleteRunUpDialog(),
		[{btn: 'Да'}, {btn: 'Нет'}],
		(function (btn) {
			if (btn == 'Да') {
				this.service.completeRunUp();
			}
		}).bind(this)
	);
};

/**
 * Обработка события завершения дежурства.
 */
JournalController.prototype.onCallCompleteDuty = function () {
	Dialog.getInstance().show('Завершение дежурства',
		Settings.getInstance().getCompleteDutyDialog(),
		[{btn: 'Да'}, {btn: 'Нет'}],
		(function (btn) {
			if (btn == 'Да') {
				this.service.completeDuty();
			}
		}).bind(this)
	);
};

//------------------------------------------------------------------------------
// module menu handlers
//------------------------------------------------------------------------------

JournalController.prototype.onCallIndexModule = function () {
	var indexModule = ModuleManager.getInstance().getModule(Consts.INDEX);
	this.model.setModule(indexModule);
};

/**
 * Обработка события показа модуля управления данными.
 */
JournalController.prototype.onCallDictionaryModule = function () {
	var dictionaryModule = ModuleManager.getInstance().getModule(Consts.DICTIONARY);
	this.model.setModule(dictionaryModule);
};

/**
 * Обработка события показа модуля.
 */
JournalController.prototype.onCallDutyModule = function () {

};

/**
 * Обработка события показа модуля статистики.
 */
JournalController.prototype.onCallShowStatistics = function () {

};
