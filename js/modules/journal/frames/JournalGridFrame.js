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
    this.domElement.className = 'journalGridFrame';

	this.createTools();
    this.createGrid();
	this.createPaginator();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
JournalGridFrame.prototype.init = function () {
    this.paginator.refresh();
};

/**
 * Установка списка боевых дежурств.
 * @paran dutyList Список боевых дежурств.
 */
JournalGridFrame.prototype.setDutyList = function (dutyList) {
    this.paginator.setData(dutyList.data, dutyList.count);
    this.grid.setData(dutyList.data);

    this.paginator.setVisible(!isEmpty(dutyList.data));
};

/**
 * Обновление списка боевых дежурств.
 */
JournalGridFrame.prototype.refreshDutyList = function () {
    this.paginator.refresh();
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
    this.grid = new DataGrid('Список боевых дежурств пуст', actionColumns);
    this.grid.render();

    var actionColumns = new ActionColumnsConfig(null, [
        new EditColumn(this.grid),
        new RemoveColumn(this.grid)
    ]);

    this.grid.setColumns(columns, actionColumns);
    this.domElement.appendChild(this.grid.getDomElement());

    this.grid.getDomElement().addEventListener(EDITT_DUTY, function (event) {
        event.stopPropagation();
        alert('Редактирование боевого дежурства: ' + event.detail.dutyId);
    });

    this.grid.getDomElement().addEventListener(REMOVE_DUTY, function (event) {
        event.stopPropagation();
        alert('Удаление боевого дежурства: ' + event.detail.dutyId);
    });
};

/**
 * Создания компонента для постраничного просмотра элементов таблицы.
 */
JournalGridFrame.prototype.createPaginator = function () {
	this.paginator = new Paginator(Settings.getInstance().getDutyListPageSize());
    this.paginator.render();
    this.paginator.setVisible(false);
	this.domElement.appendChild(this.paginator.getDomElement());
};
