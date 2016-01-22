/**
 * Фрейм таблицы журнала боевых дежурств.
 */
function JournalGridFrame () {
    Widget.apply(this, arguments);

    this.paginator = null;
    this.grid = null;
};

extend(JournalGridFrame, Widget);

/**
 * Отрисовка фрейма.
 */
JournalGridFrame.prototype.render = function () {
    this.domElement = document.createElement('div');

	this.createTools();
    this.createGrid();
	this.createPaginator();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
JournalGridFrame.prototype.init = function () {
    this.paginator.init();
};

JournalGridFrame.prototype.setDutyList = function (dutyList) {
    this.paginator.setData(dutyList.data, dutyList.count);
    this.grid.setData(dutyList.data);
};

JournalGridFrame.prototype.refreshDutyList = function () {
    this.paginator.onClickRefreshGridButton(); //TODO: bad method
};

/**
 * Создание панели инструментов.
 */
JournalGridFrame.prototype.createTools = function () {
	var html = '<div style="font-weight: bold; margin-bottom: 5px;">Боевые дежурства:</div>';
	this.domElement.insertAdjacentHTML('afterbegin', html);
};

/**
 * Создание таблицы боевых дежурств.
 */
JournalGridFrame.prototype.createGrid = function () {
    var columns = Settings.getInstance().getDutyListColumns();
    this.grid = new DataGrid('column', 'name', 'Список боевых дежурств пуст'); // TODO: get column field name from config
    this.grid.render();
    this.grid.setColumns(columns);
    this.domElement.appendChild(this.grid.getDomElement());
};

/**
 * Создания компонента для постраничного просмотра элементов таблицы.
 */
JournalGridFrame.prototype.createPaginator = function () {
	this.paginator = new Paginator(3/*Settings.getInstance().config.ui.journalGridPageSize*/);
    this.paginator.render();
	this.domElement.appendChild(this.paginator.getDomElement());
};
