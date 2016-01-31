/**
 * Фрейм таблицы журнала боевых дежурств.
 */
function JournalGridFrame () {
    ViewFrame.apply(this, arguments);

    this.paginator = null;
    this.grid = null;
};

extend(JournalGridFrame, ViewFrame);

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
    this.grid.setData(dutyList.data, dutyList.sort);

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
    this.grid = new DataGrid('Список боевых дежурств пуст');
    this.grid.render();

    var gridEl = this.grid.getDomElement();

    var actionColumns = new ActionColumnsConfig(null, [
        new EditColumn(this.grid),
        new RemoveColumn(this.grid)
    ]);

    var customRows = [
        new ActiveDutyRow(this.grid)
    ];

    this.grid.setCustom(actionColumns, customRows);

    this.grid.setColumns(columns);
    this.domElement.appendChild(gridEl);

    gridEl.addEventListener(EDITT_DUTY, function (event) {
        event.stopPropagation();
        alert('Редактирование боевого дежурства: ' + event.detail.dutyId); //TODO
    });

    gridEl.addEventListener(REMOVE_DUTY, function (event) {
        event.stopPropagation();
        alert('Удаление боевого дежурства: ' + event.detail.dutyId); //TODO
    });

    gridEl.addEventListener(SORT_GRID, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(CALL_LOAD_DUTY_LIST, {
            offset: this.paginator.offset,
            pageSize: this.paginator.pageSize,
            sort: event.detail
        }));
    }).bind(this));
};

/**
 * Создания компонента для постраничного просмотра элементов таблицы.
 */
JournalGridFrame.prototype.createPaginator = function () {
	this.paginator = new Paginator(Settings.getInstance().getDutyListPageSize());
    this.paginator.render();

    var paginatorEl = this.paginator.getDomElement();

    this.paginator.setVisible(false);
	this.domElement.appendChild(paginatorEl);

    paginatorEl.addEventListener(CHANGE_PAGE, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(CALL_LOAD_DUTY_LIST, {
            offset: event.detail.offset,
            pageSize: event.detail.pageSize,
            sort: this.grid.sort
        }));
    }).bind(this));
};
