/**
 * Фрейм таблицы журнала боевых дежурств.
 */
function DutyListFrame () {
    ViewFrame.apply(this, arguments);

    this.name = 'Список боевых дежурств';
    this.paginator = null;
    this.grid = null;
};

extend(DutyListFrame, ViewFrame);

/**
 * Отрисовка фрейма.
 */
DutyListFrame.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.className = 'dutyListFrame';

    this.createGrid();
	this.createPaginator();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
DutyListFrame.prototype.init = function () {
    this.paginator.refresh();
};

/**
 * Установка списка боевых дежурств.
 * @paran dutyList Список боевых дежурств.
 */
DutyListFrame.prototype.setDutyList = function (dutyList) {
    this.paginator.setData(dutyList.data, dutyList.count);
    this.grid.setData(dutyList.data, dutyList.sort);

    this.paginator.setVisible(!isEmpty(dutyList.data));
};

/**
 * Обновление списка боевых дежурств.
 */
DutyListFrame.prototype.refreshDutyList = function () {
    this.paginator.refresh();
};

/**
 * Создание таблицы боевых дежурств.
 */
DutyListFrame.prototype.createGrid = function () {
    var columns = Settings.getInstance().getDutyListColumns();
    this.grid = new DataGrid('Список боевых дежурств пуст');
    this.grid.render();

    var gridEl = this.grid.getDomElement();

    var actionColumns = new ActionColumnsConfig(this.grid,
        null, [
            new EditColumn(EventTypes.EDIT_ITEM),
            new RemoveColumn(EventTypes.REMOVE_ITEM)
        ]
    );

    var customRows = [
        new ActiveDutyRow(this.grid)
    ];

    this.grid.setCustom(actionColumns, customRows);

    this.grid.setColumns(columns);
    this.domElement.appendChild(gridEl);

    gridEl.addEventListener(EventTypes.EDIT_ITEM, function (event) {
        event.stopPropagation();
        alert('Редактирование боевого дежурства: ' + event.detail.dutyId); //TODO
    });

    gridEl.addEventListener(EventTypes.REMOVE_ITEM, function (event) {
        event.stopPropagation();
        alert('Удаление боевого дежурства: ' + event.detail.dutyId); //TODO
    });

    gridEl.addEventListener(EventTypes.SORT_GRID, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_DUTY_LIST, {
            offset: this.paginator.offset,
            pageSize: this.paginator.pageSize,
            sort: event.detail
        }));
    }).bind(this));
};

/**
 * Создания компонента для постраничного просмотра элементов таблицы.
 */
DutyListFrame.prototype.createPaginator = function () {
	this.paginator = new Paginator(Settings.getInstance().getDutyListPageSize());
    this.paginator.render();

    var paginatorEl = this.paginator.getDomElement();

    this.paginator.setVisible(false);
	this.domElement.appendChild(paginatorEl);

    paginatorEl.addEventListener(EventTypes.CHANGE_PAGE, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_DUTY_LIST, {
            offset: event.detail.offset,
            pageSize: event.detail.pageSize,
            sort: this.grid.sort
        }));
    }).bind(this));
};
