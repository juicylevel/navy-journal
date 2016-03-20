/**
 * Фрейм со списком элементов провизии.
 */
function ProvisionsFrame () {
    ViewFrame.apply(this, arguments);

    this.name = 'Провизия';
    this.provisionsGrid = null;

    this.provisionsItemForm = null;
};

extend(ProvisionsFrame, ViewFrame);

/**
 * Отрисовка фрейма.
 */
ProvisionsFrame.prototype.render = function () {
    this.domElement = document.createElement('div');

    this.createEditor();
    this.createProvisionsGrid();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
ProvisionsFrame.prototype.init = function () {
    this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_PROVISIONS_DATA));
};

/**
 * Установка элементов провизии.
 * @param provisionsItems Элементы провизии.
 */
ProvisionsFrame.prototype.setProvisionsItems = function (provisionsItems) {
    this.provisionsGrid.setData(provisionsItems.data, provisionsItems.sort);
};

/**
 * Установка типов провизии.
 * @param provisionsTypes Типы провизии.
 */
ProvisionsFrame.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.provisionsItemForm.setProvisionsTypes(provisionsTypes);
};

/**
 * Создание и настройка формы добавления/редактирования элементов провизии.
 */
ProvisionsFrame.prototype.createEditor = function () {
    var editorEl = document.createElement('div');
    editorEl.style.marginBottom = '10px';

    this.provisionsItemForm = new ProvisionsItemForm('horizontal', 'inline-block');
    var formEl = this.provisionsItemForm.getDomElement();
    var addButton = new Button('Сохранить', formEl, 'save', 'inline-block');
    var addButtonEl = addButton.getDomElement();
    var clearButton = new Button('Очистить', formEl, 'clear', 'inline-block');
    var clearButtonEl = clearButton.getDomElement();

    addButtonEl.addEventListener('click', (function (event) {
        var itemData = this.provisionsItemForm.getValues();
        this.saveProvisionsItem(itemData);
    }).bind(this));

    clearButtonEl.addEventListener('click', (function (event) {
        this.provisionsItemForm.clear();
        this.provisionsGrid.deselectRows();
    }).bind(this));

    editorEl.appendChild(this.provisionsItemForm.getDomElement());
    editorEl.appendChild(addButtonEl);
    editorEl.appendChild(clearButtonEl);

    this.domElement.appendChild(editorEl);
};

/**
 * Обработка события добавления нового элемента провизии.
 * @param provisionsItem Наименование нового элемента провизии.
 */
ProvisionsFrame.prototype.saveProvisionsItem = function (provisionsItem) {
    this.owner.sendNotification(new Notification(Notifications.SAVE_PROVISIONS_ITEM, {
        item: provisionsItem,
        sort: this.provisionsGrid.sort
    }));
};

/**
 * Создание таблицы элементов провизии.
 */
ProvisionsFrame.prototype.createProvisionsGrid = function () {
    var columns = Settings.getInstance().getProvisionsItemColumns();
    this.provisionsGrid = new DataGrid('Список элементов провизии пуст');
    this.provisionsGrid.render();

    var provisionsGridEl = this.provisionsGrid.getDomElement();

    this.provisionsGrid.setColumns(columns, ['', 250]);
    this.domElement.appendChild(provisionsGridEl);

    provisionsGridEl.addEventListener(EventTypes.SELECT_GRID_ROW, (function (event) {
        if (event.detail.selected) {
            var selectedItem = event.detail.data;
            this.provisionsItemForm.setValues({
                id: selectedItem.id,
                name: selectedItem.name,
                type_id: selectedItem.type_id
            });
            this.provisionsItemForm.getDomElement().scrollIntoView();
        } else {
            this.provisionsItemForm.clear();
        }
    }).bind(this));

    provisionsGridEl.addEventListener(EventTypes.SORT_GRID, (function (event) {
        event.stopPropagation();
        this.owner.sendNotification(new Notification(Notifications.CALL_LOAD_PROVISIONS_ITEMS, {
            sort: event.detail
        }));
    }).bind(this));
}
