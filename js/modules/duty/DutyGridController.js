/**
 * Контроллер фрейма с таблицей журнала боевых дежурств.
 */
function DutyGridController (model, service) {
	this.super(arguments);

	this.model = model;
	this.service = service;
};

ClassManager.getInstance().extend(DutyGridController, Controller);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
DutyGridController.prototype.getHandlers = function () {
	var handlers = this.super(arguments);

	var handlers = handlers.concat([
		{type: LOAD_JOURNAL_GRID_DATA, handler: this.onLoadJournalGridData}
	]);

	return handlers;
};

/**
 * Инициализация контроллера.
 */
DutyGridController.prototype.init = function () {
	this.service.getJournalTable(
		{offset: 0, pageSize: DEFAULT_GRID_PAGE_SIZE, includeColumns: true}
	);
};

/**
 * Обработка события завершения загрузки данных журнала.
 * @param gridData Данные таблицы журнала.
 */
DutyGridController.prototype.onLoadJournalGridData = function (gridData) {
	if (!isEmpty(gridData.columns)) {
		this.model.setColumns(gridData.columns);
	}
	this.model.setRows(gridData.rows);
};
