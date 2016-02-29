/**
 * Конфигурация расположения специальных колонок в таблице.
 * @param grid Целевая таблица.
 * @param leftList Список колонок, располагающихся слева от колонок данных.
 * @param rightList Список колонок, располагающихся справа от колонок данных.
 */
function ActionColumnsConfig (grid, leftList, rightList) {
    this.grid = grid;
    this.left = leftList;
    this.right = rightList;

    this.setGridToColumns(this.left);
    this.setGridToColumns(this.right);
};

/**
 * Установка таблицы колонкам.
 * @param columnsList Список кастомных колонок.
 */
ActionColumnsConfig.prototype.setGridToColumns = function (columnsList) {
    if (!isEmpty(columnsList)) {
        for (var i = 0; i < columnsList.length; i++) {
            var column = columnsList[i];
            column.setGrid(this.grid);
        }
    }
}
