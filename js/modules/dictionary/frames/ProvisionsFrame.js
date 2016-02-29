/**
 * Фрейм со списком типов провизии.
 */
function ProvisionsFrame () {
    ViewFrame.apply(this, arguments);

    this.name = 'Провизия';
    this.provisionsGrid = null;
};

extend(ProvisionsFrame, ViewFrame);

/**
 * Отрисовка фрейма.
 */
ProvisionsFrame.prototype.render = function () {
    this.domElement = document.createElement('div');

    this.createToolBar();
    this.createProvisionsGrid();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
ProvisionsFrame.prototype.init = function () {

};

/**
 * Инициализация фрейма.
 */
ProvisionsFrame.prototype.createToolBar = function () {
    var toolBarHtml = '' +
        '<div style="margin-bottom: 6px;">' +
            '<button addButton style="cursor: pointer;">Добавить</button>' +
        '</div>';

    var toolBarEl = document.createElement('div');
    toolBarEl.innerHTML = toolBarHtml;

    var addButton = getEl(toolBarEl, 'addButton');
    addButton.addEventListener('click', this.onAddProvisionType.bind(this));

    this.domElement.appendChild(toolBarEl);
};

/**
 * Обработка события клика на кнопку "Добавить".
 * @param event
 */
ProvisionsFrame.prototype.onAddProvisionType = function (event) {
    Dialog.getInstance().show('Добавление нового типа провизии', {'ОК': function () {}}, 'Сообщение');
};

/**
 * Создание таблицы типов провизии.
 */
ProvisionsFrame.prototype.createProvisionsGrid = function () {
    var columns = Settings.getInstance().getProvisionsColumns();
    this.provisionsGrid = new DataGrid('Список типов провизии пуст');
    this.provisionsGrid.render();

    var provisionsGridEl = this.provisionsGrid.getDomElement();

    var actionColumns = new ActionColumnsConfig(this.provisionsGrid,
        null, [
            new EditColumn(EventTypes.EDIT_ITEM),
            new RemoveColumn(EventTypes.REMOVE_ITEM)
        ]
    );

    this.provisionsGrid.setCustom(actionColumns);

    this.provisionsGrid.setColumns(columns);
    this.domElement.appendChild(provisionsGridEl);

    provisionsGridEl.addEventListener(EventTypes.EDIT_ITEM, function (event) {
        event.stopPropagation();
        alert('Редактирование типа провизии: '/* + event.detail.dutyId*/); //TODO
    });

    provisionsGridEl.addEventListener(EventTypes.REMOVE_ITEM, function (event) {
        event.stopPropagation();
        alert('Удаление типа провизии: '/* + event.detail.dutyId*/); //TODO
    });

    provisionsGridEl.addEventListener(EventTypes.SORT_GRID, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_PROVISIONS_TYPES_LIST, {
            offset: this.paginator.offset,
            pageSize: this.paginator.pageSize,
            sort: event.detail
        }));
    }).bind(this));
}
