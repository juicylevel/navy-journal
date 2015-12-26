/**
 * Фрейм с таблицей боевых дежурств.
 */
function DutyGridView (domElement) {
	this.super(arguments);

	this.journalGrid = null;
};

ClassManager.getInstance().extend(DutyGridView, View);

/**
 * Получение списка обработчиков оповещений.
 */
DutyGridView.prototype.getNotificationsHandlers = function () {
	return [
		{type: LOAD_JOURNAL_GRID_DATA, handler: this.loadJournalGridDataHandler}
	];
};

DutyGridView.prototype.init = function () {

};

/**
 * @public
 * Отрисовка фрейма таблицы журнала.
 */
DutyGridView.prototype.render = function () {
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
DutyGridView.prototype.createTools = function () {
	var html = '<div style="font-weight: bold;">Боевые дежурства:</div>';
	this.domElement.insertAdjacentHTML('afterbegin', html);
}

/**
 * @private
 * Создание таблицы боевых дежурств.
 */
DutyGridView.prototype.createGrid = function () {
	this.journalGrid = new DataGrid();
	this.add(this.journalGrid);

	var gridElement = this.journalGrid.domElement;
	gridElement.addEventListener(CHANGE_PAGE, this.onChangePage.bind(this));
}

DutyGridView.prototype.loadGridData = function () {
	var parameters = {
		offset: 0,
		pageSize: DEFAULT_GRID_PAGE_SIZE,
		includeColumns: true
	};

	this.sendNotification(new JournalNotification(GET_JOURNAL_TABLE_CMD, parameters));
}

DutyGridView.prototype.onChangePage = function (event) {
	event.stopPropagation();

	var parameters = {
		offset: event.detail.offset,
		pageSize: event.detail.pageSize,
		includeColumns: false
	};

	console.log('onChangePage', parameters);

	this.sendNotification(new JournalNotification(GET_JOURNAL_TABLE_CMD, parameters));
}

/**
 * Обновление состояния фрейма таблицы журнала.
 * @param notification Объект оповещения JournalNotification {type: 'тип события', data: 'данные'}.
 */
DutyGridView.prototype.loadJournalGridDataHandler = function (gridData) {
	this.journalGrid.setGridData(gridData);
}
