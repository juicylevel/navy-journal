/**
 * Кастомный ряд в таблице.
 * @param grid Целевая таблица.
 */
function CustomRow (grid) {
    Widget.apply(this, arguments);

    this.grid = grid;
};

extend(CustomRow, Widget);

/**
 * Метод определяет возможность создания кастомного ряда
 * в таблице на основе данных rowData.
 * @param rowData Данные ряда таблицы.
 */
CustomRow.prototype.isCustomRow = function (rowData) {
    return false;
};

/**
 * Создание DOM-элемента кастомного ряда таблицы.
 * @param rowData Данные ряда таблицы.
 * @param index Индекс ряда таблицы.
 * @return DOM-элемент ряда.
 */
CustomRow.prototype.createRowEl = function (rowData, index) {
    return null;
};
