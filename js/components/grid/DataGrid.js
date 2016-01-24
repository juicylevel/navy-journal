/**
 * Компонент таблицы.
 * @param emptyGridMessage Текст, который отображается когда записей в таблице нет.
 * @param columnName Наименование ключа (кода) колонки.
 * @param columnField Подпись (название) колонки.
 */
function DataGrid (emptyGridMessage, columnName, columnField) {
	Widget.apply(this, arguments);

	this.TABLE_ATTR = 'table';
	this.COLUMNS_ATTR = 'columns';
	this.COLUMN_ATTR = 'column';
	this.ROW_ATTR = 'row';
	this.CELL_ATTR = 'cell';

	this.EMPTY_ROW = 'emptyRow';
	this.EMPTY_CELL = 'emptyCell';
	this.EMPTY_ROW_TEXT = emptyGridMessage || 'Список пуст';

	this.COLUMN_NAME = columnName || 'column';
	this.COLUMN_FIELD = columnField || 'name';

	this.columnsData = [];
	this.rowsData = [];
};

extend(DataGrid, Widget);

/**
 * Отрисовка таблицы.
 */
DataGrid.prototype.render = function () {
	this.domElement = document.createElement('div');
	this.domElement.className = 'dataGrid';

	var tableEl = document.createElement('table');
	tableEl.setAttribute(this.TABLE_ATTR, '');
	this.domElement.appendChild(tableEl);

	return this.domElement;
};

/**
 * Установка колонок.
 * @param columns Список колонок.
 * @param actionColumns Конфигурация расположения специальных колонок в таблице.
 */
DataGrid.prototype.setColumns = function (columns, actionColumns) {
	this.configureColumnsData(columns, actionColumns);

	var tableEl = this.getTableEl();
	removeEl(tableEl, this.COLUMN_ATTR, null, true);

	var columnsElement = this.createColumns();
	tableEl.appendChild(columnsElement);

	this.showEmptyRow();
};

/**
 * Конфигурирвание колонок таблицы: объединение колонок
 * с данныи со специальными колонками.
 * @param dataColumns Колонки данных.
 * @param actionColumns Специальные колонки.
 */
DataGrid.prototype.configureColumnsData = function (dataColumns, actionColumns) {
	var getActionColumns = function (position) {
		return actionColumns && actionColumns[position] || [];
	};

	this.columnsData = this.columnsData.concat(
		getActionColumns('left'),
		dataColumns,
		getActionColumns('right')
	);
};

/**
 * Отображение пустого ряда.
 */
DataGrid.prototype.showEmptyRow = function () {
	var tableEl = this.getTableEl();

	var rowEl = document.createElement('tr');
	rowEl.setAttribute(this.ROW_ATTR, this.EMPTY_ROW);
	rowEl.className = 'gridRow';

	var cellEl = document.createElement('td');
	cellEl.setAttribute(this.CELL_ATTR, this.EMPTY_CELL);
	cellEl.className = 'emptyCell';

	var messageEl = document.createTextNode(this.EMPTY_ROW_TEXT);
	cellEl.appendChild(messageEl);
	cellEl.setAttribute('colspan', this.columnsData.length);

	rowEl.appendChild(cellEl);
	tableEl.appendChild(rowEl);
};

/**
 * Установка записей таблицы.
 * @param data Список записей таблицы.
 */
DataGrid.prototype.setData = function (data) {
	var tableEl = this.getTableEl();
	if (!isEmpty(data)) {
		this.rowsData = data;
		removeEl(tableEl, this.ROW_ATTR, null, true);

		var rowEls = this.createRows();
		for (var i = 0; i < rowEls.length; i++) {
			var rowEl = rowEls[i];
			tableEl.appendChild(rowEl);
		}
	}
};

/**
 * Создание колонок таблицы.
 * @return Список DOM-элементов колонок таблицы.
 */
DataGrid.prototype.createColumns = function () {
	var columnEls = document.createElement('tr');
	columnEls.setAttribute(this.COLUMNS_ATTR, '');
	columnEls.className = 'gridHead';
	for (var i = 0; i < this.columnsData.length; i++) {
		var columnData = this.columnsData[i];
		var columnEl = this.createColumn(columnData);
		columnEls.appendChild(columnEl);
	}
	return columnEls;
};

/**
 * Создание колоноки таблицы.
 * @param columnData Данные колонки таблицы.
 * @return DOM-элемент колонки таблицы.
 */
DataGrid.prototype.createColumn = function (columnData) {
	var columnEl = document.createElement('td');
	columnEl.setAttribute(this.COLUMN_ATTR, columnData[this.COLUMN_NAME])
	var labelEl = document.createTextNode(columnData[this.COLUMN_FIELD]);
	columnEl.appendChild(labelEl);
	return columnEl;
};

/**
 * Создание рядов таблицы.
 * @return Список DOM-элементов рядов таблицы.
 */
DataGrid.prototype.createRows = function () {
	var rowsElements = [];
	for (var i = 0; i < this.rowsData.length; i++) {
		var rowEl = document.createElement('tr');
		rowEl.setAttribute(this.ROW_ATTR, this.getRowAttributeValue(i));
		rowEl.className = 'gridRow';
		var rowData = this.rowsData[i];
		for (var j = 0; j < this.columnsData.length; j++) {
			var columnData = this.columnsData[j];
			var cellEl;

			if (columnData.actionColumn) {
				cellEl = columnData.createCellElement();
			}
			else {
				var value = rowData[columnData[this.COLUMN_NAME]];
				cellEl = this.createCell(value);
			}

			rowEl.appendChild(cellEl);
		}
		rowsElements.push(rowEl);
	}
	return rowsElements;
};

/**
 * Получение общего количества колонок.
 * @return Количество колонок в таблице.
 */
DataGrid.prototype.getColumnsCount = function () {
	var count = 0;
	if (!isEmpty(this.columnsData)) {
		count += this.columnsData.length;
	}
	if (!isEmpty(this.actionColumns)) {
		count += !isEmpty(this.actionColumns.left) ? this.actionColumns.left.length : 0;
		count += !isEmpty(this.actionColumns.right) ? this.actionColumns.right.length : 0;
	}
	return count;
};

/**
 * Получение значения атрибута ряда таблицы.
 * @param rowIndex Индекс ряда таблицы.
 * @return Значение атрибута.
 */
DataGrid.prototype.getRowAttributeValue = function (rowIndex) {
	return this.ROW_ATTR + '-' + (rowIndex + 1);
};

/**
 * Создание DOM-элемента ячейки таблицы.
 * @param value Значение ячейки.
 * @return DOM-элемент ячейки таблицы.
 */
DataGrid.prototype.createCell = function (value) {
	var cellEl = document.createElement('td');
	cellEl.setAttribute(this.CELL_ATTR, '');
	var valueEl = document.createTextNode(value);
	cellEl.appendChild(valueEl);
	return cellEl;
};

/**
 * Получение DOM-элемента таблицы.
 * @return DOM-элемент таблиуы.
 */
DataGrid.prototype.getTableEl = function () {
	return getEl(this.domElement, this.TABLE_ATTR);
};
