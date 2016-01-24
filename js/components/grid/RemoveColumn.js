function RemoveColumn () {
    ActionColumn.apply(this, arguments);
};

extend(RemoveColumn, ActionColumn);

/**
 * Создание ячейки в колонке таблицы.
 * @return DOM-элемент ячейки.
 */
RemoveColumn.prototype.createCellElement = function () {
    var cellEl = document.createElement('td');
	cellEl.setAttribute(this.grid.CELL_ATTR, 'remove-cell');
	cellEl.innerHTML = '<div class="removeCell"></div>';

    cellEl.addEventListener('click', (function () {
        this.dispatchActionEvent(REMOVE_DUTY, {dutyId: null});
    }).bind(this));

	return cellEl;
};
