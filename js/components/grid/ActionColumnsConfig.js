/**
 * Конфигурация расположения специальных колонок в таблице.
 * @param grid Целевая таблица.
 * @param leftColumns Список классов колонок, располагающихся слева от колонок данных.
 * @param rightColumns Список классов колонок, располагающихся справа от колонок данных.
 */
function ActionColumnsConfig (grid, leftColumns, rightColumns) {
    this.grid = grid;

    this.setGridToColumns(leftColumns);
    this.setGridToColumns(rightColumns);
};

/**
 * Установка таблицы колонкам.
 * @param columnsList Список кастомных колонок.
 */
ActionColumnsConfig.prototype.setGridToColumns = function (columnsList) {
    if (!isEmpty(columnsList)) {
        for (var i = 0; i < columnsList.length; i++) {
            var columnClass = columnsList[i];
            var column = new columnClass();
            column.setGrid(this.grid);
        }
    }
};
