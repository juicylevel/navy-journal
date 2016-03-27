/**
 * Колонка для удаления записей в таблице.
 */
function RemoveColumn () {
    ActionColumn.apply(this, arguments);
};

extend(RemoveColumn, ActionColumn);

/**
 * Создание ячейки в колонке таблицы.
 * @return DOM-элемент ячейки.
 */
RemoveColumn.prototype.createCellElement = function (rowData) {
    var cellEl = document.createElement('td');
	cellEl.setAttribute(this.grid.CELL_ATTR, 'remove-cell');
	cellEl.innerHTML = '<div class="removeCell"></div>';

    cellEl.addEventListener('click', (function (event) {
        event.stopPropagation();
        this.dispatchActionEvent('removerow', {rowData: rowData});
    }).bind(this));

	return cellEl;
};
