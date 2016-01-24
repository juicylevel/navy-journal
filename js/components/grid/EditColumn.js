function EditColumn () {
    ActionColumn.apply(this, arguments);
};

extend(EditColumn, ActionColumn);

/**
 * Создание ячейки в колонке таблицы.
 * @return DOM-элемент ячейки.
 */
EditColumn.prototype.createCellElement = function () {
    var cellEl = document.createElement('td');
	cellEl.setAttribute(this.grid.CELL_ATTR, 'edit-cell');
	cellEl.innerHTML = '<div class="editCell"></div>';

    cellEl.addEventListener('click', (function () {
        this.dispatchActionEvent(EDITT_DUTY, {dutyId: null});
    }).bind(this));

	return cellEl;
};
