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

    this.runTimers(rowData, rowEl);

    return rowEl;
};

/**
 * Запуск таймеров подготовки к дежурству и длительности дежурства.
 * @param rowData Данные ряда таблицы.
 * @param rowEl DOM-элемент ряда.
 */
ActiveDutyRow.prototype.runTimers = function (rowData, rowEl) {
    var countingCells = this.getCountingCells(rowData, rowEl);
    if (!isEmpty(countingCells)) {
        var me = this;
        var duration = rowData.activeDuty.duration;
        this.updateCountingCells(countingCells, duration);
        setInterval(function () {
            duration++;
            me.updateCountingCells(countingCells, duration);
        }, 1000);
    }
};

/**
 * Получение DOM-элементов ячеек ряда, для которых нужно обновить значение времени.
 * @param rowData Данные ряда таблицы.
 * @param rowEl DOM-элемент ряда.
 * @return cellEls
 */
ActiveDutyRow.prototype.getCountingCells = function (rowData, rowEl) {
    var cellEls = [];
    var columnKeys = rowData.activeDuty.columns;
    for (var i = 0; i < columnKeys.length; i++) {
        var columnKey = columnKeys[i];
        var cellEl = getEl(rowEl, this.grid.CELL_ATTR, columnKey);
        if (!isEmpty(cellEl)) {
            cellEls.push(cellEl);
        }
    }
    return cellEls;
};

/**
 * Обновление значения временя в указанных ячейках.
 * @param countingCells DOM-элементы ячеек ряда, для которых нужно обновить значение времени.
 * @param duration Количество секунд.
 */
ActiveDutyRow.prototype.updateCountingCells = function (countingCells, duration) {
    var cellCount = countingCells.length;
    for (var i = 0; i < cellCount; i++) {
        countingCells[i].innerHTML = getDurationString(duration);
    }
};
