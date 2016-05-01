/**
 * Ряд в таблице боевых дежурств для отображения активного дежурства.
 */
function ActiveDutyRow () {
    CustomRow.apply(this, arguments);
};

extend(ActiveDutyRow, CustomRow);

/**
 * @see CustomRow.isCustomRow
 */
ActiveDutyRow.prototype.isCustomRow = function (rowData) {
    return !isEmpty(rowData.activeDuty);
};

/**
 * @see CustomRow.createRowEl
 */
ActiveDutyRow.prototype.createRowEl = function (rowData, index) {
    var rowEl = document.createElement('tr');
    rowEl.setAttribute(this.grid.ROW_ATTR, this.grid.getRowAttributeValue(index));
	rowEl.className = 'gridRow activeDutyGridRow';
    this.grid.createRowCells(rowData, rowEl);

    var targetColumns = ['runup_time', 'end_date'];
    for (var i = 0; i < targetColumns.length; i++) {
        var columnKey = targetColumns[i];
        var cellEl = getEl(rowEl, this.grid.CELL_ATTR, columnKey);
        if ((isEmpty(rowData[columnKey]) || rowData[columnKey] == 0) && !isEmpty(cellEl)) {
            cellEl.innerHTML = '<span style="font-style: italic;">определяется</span>';
        }
    }

    return rowEl;
};
