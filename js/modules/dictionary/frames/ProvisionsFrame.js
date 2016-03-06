/**
 * Фрейм со списком элементов провизии.
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
    this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_PROVISIONS_ITEMS));
};

/**
 * Установка элементов провизии.
 * @param provisionsItems Типы провизии.
 */
ProvisionsFrame.prototype.setProvisionsItems = function (provisionsItems) {
    this.provisionsGrid.setData(provisionsItems.data, provisionsItems.sort);
};

/**
 * Инициализация фрейма.
 */
ProvisionsFrame.prototype.createToolBar = function () {
    var toolBarHtml = '' +
        '<div style="margin-bottom: 6px;">' +
            '<input type="text" provisionsItemField placeholder="Введите наименование нового элемента провизии" style="width: 400px; padding: 2px 4px; margin-right: 3px;">' +
            '<button addButton disabled="disabled" style="cursor: pointer; padding: 2px 4px;">Добавить</button>' +
        '</div>';

    var toolBarEl = document.createElement('div');
    toolBarEl.innerHTML = toolBarHtml;

    this.configureToolBar(toolBarEl);

    this.domElement.appendChild(toolBarEl);
};

/**
 * Конфигурирование элементов управления панели инструментов.
 * @param toolBarEl DOM-элемент панели инструментов.
 */
ProvisionsFrame.prototype.configureToolBar = function (toolBarEl) {
    var provisionsItemFieldEl = getEl(toolBarEl, 'provisionsItemField');
    var addButtonEl = getEl(toolBarEl, 'addButton');

    addButtonEl.addEventListener('click', (function (event) {
        this.notifyAddProvisionsItem(provisionsItemFieldEl.value);
    }).bind(this));

    provisionsItemFieldEl.addEventListener('input', function () {
        addButtonEl.disabled = isEmpty(this.value);
    });

    provisionsItemFieldEl.addEventListener('keypress', (function (event) {
        var name = provisionsItemFieldEl.value;
        if (event.keyCode == 13 && !isEmpty(name)) {
            this.notifyAddProvisionsItem(name);
        }
    }).bind(this));
};

/**
 * Очистка поля ввода нового элемента провизии.
 */
ProvisionsFrame.prototype.resetToolBarControls = function () {
    var provisionsItemFieldEl = getEl(this.domElement, 'provisionsItemField');
    var addButtonEl = getEl(this.domElement, 'addButton');
    provisionsItemFieldEl.value = '';
    addButtonEl.disabled = true;
};

/**
 * Обработка события добавления нового элемента провизии.
 * @param name Наименование нового элемента провизии.
 */
ProvisionsFrame.prototype.notifyAddProvisionsItem = function (name) {
    this.owner.sendNotification(new Notification(Notifications.ADD_PROVISIONS_ITEM, {
        name: name,
        sort: this.provisionsGrid.sort
    }));
    this.resetToolBarControls();
};

/**
 * Создание таблицы элементов провизии.
 */
ProvisionsFrame.prototype.createProvisionsGrid = function () {
    var columns = Settings.getInstance().getProvisionsItemColumns();
    this.provisionsGrid = new DataGrid('Список элементов провизии пуст');
    this.provisionsGrid.render();

    var provisionsGridEl = this.provisionsGrid.getDomElement();

    var actionColumns = new ActionColumnsConfig(this.provisionsGrid,
        null, [
            new EditColumn(EventTypes.EDIT_ITEM),
            new RemoveColumn(EventTypes.REMOVE_ITEM)
        ]
    );

    this.provisionsGrid.setCustom(actionColumns);

    this.provisionsGrid.setColumns(columns, ['', 150, 27, 27]);
    this.domElement.appendChild(provisionsGridEl);

    provisionsGridEl.addEventListener(EventTypes.EDIT_ITEM, function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.EDIT_PROVISIONS_ITEM, {
            provisionsType: event.detail.rowData
        }));
    });

    provisionsGridEl.addEventListener(EventTypes.REMOVE_ITEM, function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.HIDE_PROVISIONS_ITEM, {
            provisionsType: event.detail.rowData
        }));
    });

    provisionsGridEl.addEventListener(EventTypes.SORT_GRID, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_PROVISIONS_ITEMS, {
            sort: event.detail
        }));
    }).bind(this));
}
