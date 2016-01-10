/**
 * Фрейм с таблицей боевых дежурств.
 */
function DutyView () {
	this.super(arguments);

	this.journalGrid = null;
};

extend(DutyView, View);

/**
 * Получение списка обработчиков оповещений.
 */
DutyView.prototype.getHandlers = function () {
	return [
		{type: LOAD_JOURNAL_GRID_DATA, handler: this.loadJournalGridDataHandler}
	];
};

/**
 * Отрисовка фрейма таблицы журнала.
 */
DutyView.prototype.render = function () {
	this.domElement = document.createElement('div');

	this.createTools();
	this.createGrid();
	this.sendNotification(new Notification(VIEW_READY));

	return this.domElement;
}

/**
 * @private
 * Создание панели инструментов.
 */
DutyView.prototype.createTools = function () {
	var html = '<div style="font-weight: bold;">Боевые дежурства:</div>';
	this.domElement.insertAdjacentHTML('afterbegin', html);
}

/**
 * @private
 * Создание таблицы боевых дежурств.
 */
DutyView.prototype.createGrid = function () {
	this.journalGrid = new DataGrid();
	this.add(this.journalGrid);

	var gridElement = this.journalGrid.domElement;
	gridElement.addEventListener(CHANGE_PAGE, this.onChangePage.bind(this));
}

DutyView.prototype.loadGridData = function () {
	var parameters = {
		offset: 0,
		pageSize: DEFAULT_GRID_PAGE_SIZE,
		includeColumns: true
	};

	this.sendNotification(new Notification(GET_JOURNAL_TABLE_CMD, parameters));
}

DutyView.prototype.onChangePage = function (event) {
	event.stopPropagation();

	var parameters = {
		offset: event.detail.offset,
		pageSize: event.detail.pageSize,
		includeColumns: false
	};

	console.log('onChangePage', parameters);

	this.sendNotification(new Notification(GET_JOURNAL_TABLE_CMD, parameters));
}

/**
 * Обновление состояния фрейма таблицы журнала.
 * @param notification Объект оповещения JournalNotification {type: 'тип события', data: 'данные'}.
 */
DutyView.prototype.loadJournalGridDataHandler = function (gridData) {
	this.journalGrid.setGridData(gridData);
}
