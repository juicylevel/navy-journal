/**
 * Колонка в таблице для выполнения операций над записями.
 * @param column Наименование (ключ) колонки.
 * @param field Надпись колонки.
 */
function ActionColumn (column, name) {
    this.actionColumn = true;
    this.column = column || 'remove';
    this.name = name || '';
};

/**
 * Установка родительской таблицы.
 * @param grid Таблица.
 */
ActionColumn.prototype.setGrid = function (grid) {
    this.grid = grid;
},

/**
 * Создание заголовка колонки.
 * @return DOM-элемент заголовка.
 */
ActionColumn.prototype.createHeaderElement = function () {
    var columnData = {};
    columnData[this.grid.COLUMN_NAME] = this.column;
    columnData[this.grid.COLUMN_FIELD] = this.name;

    var columnEl = this.grid.createColumn(columnData);
    return columnEl;
};

/**
 * Создание ячейки в колонке таблицы.
 * @return DOM-элемент ячейки.
 */
ActionColumn.prototype.createCellElement = function () {

};

/**
 * Отправка сообщения о вызове действия.
 * @param type Тип события.
 * @param payload Данные события.
 */
ActionColumn.prototype.dispatchActionEvent = function (type, payload) {
    var event = new CustomEvent(type, {
        detail: payload,
        bubbles: true
    });
    this.grid.el.dispatchEvent(event);
};
