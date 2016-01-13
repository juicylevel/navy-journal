/**
 * TODO: write class description
 */
function DutyView () {
	View.apply(this, arguments);

	this.dutyGrid = null;
	this.paginator = null;
};

extend(DutyView, View);

/**
 * Получение списка обработчиков оповещений.
 */
DutyView.prototype.getHandlers = function () {
	/*return [
		{type: LOAD_JOURNAL_GRID_DATA, handler: this.loadJournalGridDataHandler}
	];*/
	return [];
};

/**
 * Отрисовка фрейма таблицы журнала.
 */
DutyView.prototype.render = function () {
	this.domElement = document.createElement('div');

	this.createTools();
	//this.createGrid();
	this.createPaginator();

	this.sendNotification(new Notification(VIEW_READY));

	return this.domElement;
};

DutyView.prototype.createTools = function () {
	var html = '<div style="font-weight: bold;">Боевые дежурства:</div>';
	this.domElement.insertAdjacentHTML('afterbegin', html);
};

DutyView.prototype.createGrid = function () {
	this.dutyGrid = new DataGrid();

	var dutyGridEl = this.dutyGrid.domElement;
	this.domElement.appendChild(dutyGridEl);
	//gridEl.addEventListener(CHANGE_PAGE, this.onChangePage.bind(this));
};

DutyView.prototype.createPaginator = function () {
	this.paginator = new Paginator();
	this.domElement.appendChild(this.paginator.getDomElement());
};

/*DutyView.prototype.loadGridData = function () {
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

DutyView.prototype.loadJournalGridDataHandler = function (gridData) {
	this.journalGrid.setGridData(gridData);
}
*/
