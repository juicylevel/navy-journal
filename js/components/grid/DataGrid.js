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

	this.actionColumns = [];
	this.customRows = [];

	/**
	 * Информация о сортировке записей.
	 * Объект типа {column1: ASC, column2: DESC}.
	 */
	this.sort = null;
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
 * Установка кастомных колонок и рядов.
 * @param actionColumns Конфигурация расположения специальных колонок в таблице.
 * @param customRows Кастомные ряды таблицы.
 */
DataGrid.prototype.setCustom = function (actionColumns, customRows) {
	this.actionColumns = actionColumns;
	this.customRows = customRows;
};

/**
 * Установка колонок.
 * @param columns Список колонок.
 */
DataGrid.prototype.setColumns = function (columns, actionColumns) {
	this.configureColumnsData(columns);

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
 */
DataGrid.prototype.configureColumnsData = function (dataColumns) {
	var getActionColumns = function (position) {
		return !isEmpty(this.actionColumns) && this.actionColumns[position] || [];
	};

	this.columnsData = this.columnsData.concat(
		getActionColumns.call(this, 'left'),
		dataColumns,
		getActionColumns.call(this, 'right')
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
 * @param sort Информация о сортировке записей.
 */
DataGrid.prototype.setData = function (data, sort) {
	var tableEl = this.getTableEl();
	if (!isEmpty(data)) {
		this.rowsData = data;
		this.sort = sort;

		this.updateColumnsSort();

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
	var columnKey = columnData[this.COLUMN_NAME];
	var columnEl = document.createElement('td');
	columnEl.setAttribute(this.COLUMN_ATTR, columnKey);

	var sortHtml = '';
	if (!columnData.actionColumn) { // TODO: duplicate check actionColumn
		sortHtml = '' +
			'<div class="columnSort">' +
				'<div sort="ASC" class="sortAscOff"></div>' +
				'<div sort="DESC" class="sortDescOff"></div>' +
			'</div>';
	}

	var title = columnData[this.COLUMN_FIELD];
	var columnHtml = '' +
		'<div class="columnContainer">' +
			'<div title class="columnTitle">' + title + '</div>' +
			sortHtml +
			'<div class="clearBoth"></div>' +
		'</div>';

	columnEl.innerHTML = columnHtml;

	if (!columnData.actionColumn) { // TODO: duplicate check actionColumn
		this.configureSortButtons(columnEl, columnKey);
	}

	return columnEl;
};

/**
 * Настройка кнопок сортировки.
 * @param columnEl DOM-элемент колонки.
 * @param columnKey Колонка.
 */
DataGrid.prototype.configureSortButtons = function (columnEl, columnKey) {
	var configureSortButton = function (direction) {
		var sortButtonEl = getEl(columnEl, 'sort', direction);
		sortButtonEl.columnKey = columnKey;
		sortButtonEl.addEventListener('click', (this.onSortButton).bind(this));
	};
	configureSortButton.call(this, 'ASC');
	configureSortButton.call(this, 'DESC');
};

/**
 * Обработка события клика по кнопке сортировки.
 * @param event
 */
DataGrid.prototype.onSortButton = function (event) {
	var sortEl = event.target;
	var sortElDirection = sortEl.getAttribute('sort');
	var columnKey = sortEl.columnKey;
	// если пользователь выбрал то же направление сортировки
	// для одной и той же колонки, то сбрасываем сортировку
	var sort = null;
	if (isEmpty(this.sort) || this.sort[columnKey] != sortElDirection) {
		sort = {}; sort[columnKey] = sortElDirection;
	}
	var sortEvent = new CustomEvent(
		SORT_GRID,
		{
			detail: sort,
			bubbles: true
		}
	);
	this.domElement.dispatchEvent(sortEvent);
};

/**
 * Обновление кнопок сортировки в колонках таблицы.
 */
DataGrid.prototype.updateColumnsSort = function () {
	if (!isEmpty(this.sort)) {
		var columnData, columnKey, columnEl, direction, ascButtonEl, descButtonEl;
		for (var i = 0; i < this.columnsData.length; i++) {
			columnData = this.columnsData[i];
			if (!columnData.actionColumn) {
				columnKey = columnData[this.COLUMN_NAME];
				columnEl = getEl(this.domElement, this.COLUMN_ATTR, columnKey);
				ascButtonEl = getEl(columnEl, 'sort', 'ASC');
				descButtonEl = getEl(columnEl, 'sort', 'DESC');
				direction = this.sort[columnKey];
				switch (direction) {
					case 'ASC':
						ascButtonEl.className = 'sortAscOn';
						descButtonEl.className = 'sortDescOff';
						break;
					case 'DESC':
						ascButtonEl.className = 'sortAscOff';
						descButtonEl.className = 'sortDescOn';
						break;
					default:
						ascButtonEl.className = 'sortAscOff';
						descButtonEl.className = 'sortDescOff';
				}
			}
		}
	}
};

/**
 * Создание рядов таблицы.
 * @return Список DOM-элементов рядов таблицы.
 */
DataGrid.prototype.createRows = function () {
	var rowsElements = [], rowData, rowEl;
	for (var i = 0; i < this.rowsData.length; i++) {
		rowData = this.rowsData[i];
		rowEl = this.createRow(rowData, i);
		rowsElements.push(rowEl);
	}
	return rowsElements;
};

/**
 * Создание DOM-элемента ряда.
 * @param rowData Данные ряда таблицы.
 * @param index Индекс ряда таблицы.
 * @return rowEl
 */
DataGrid.prototype.createRow = function (rowData, index) {
	var rowEl = null;
	var customRowObject = this.isCustomRow(rowData);
	if (!isEmpty(customRowObject)) {
		rowEl = customRowObject.createRowEl(rowData, index);
	} else {
		rowEl = this.createSimpleRow(rowData, index);
	}
	return rowEl;
};

/**
 * Метод определяет, я вляется ли ряд кастомным.
 * Если ряд кастомный, то возвращает объект кастомного ряда.
 * @param rowData Данные ряда таблицы.
 * @return customRowObject | null
 */
DataGrid.prototype.isCustomRow = function (rowData) {
	if (!isEmpty(this.customRows)) {
		for (var i = 0; i < this.customRows.length; i++) {
			var customRow = this.customRows[i];
			if (customRow.isCustomRow(rowData)) {
				return customRow;
			}
		}
	}
	return null;
};

/**
 * Создание обычного ряда таблицы.
 * @param rowData Данные ряда таблицы.
 * @param index Индекс ряда таблицы.
 * @return rowEl
 */
DataGrid.prototype.createSimpleRow = function (rowData, index) {
	var rowEl = document.createElement('tr');
	rowEl.setAttribute(this.ROW_ATTR, this.getRowAttributeValue(index));
	rowEl.baseCls = 'gridRow';
	rowEl.defaultBgCls = ((index % 2) == 0) ? 'altColor1' : 'altColor2';
	rowEl.overBgCls = 'overColor';
	rowEl.className = rowEl.baseCls + ' ' + rowEl.defaultBgCls;

	rowEl.addEventListener('mouseover', function(event) {
		this.className = this.baseCls + ' ' + this.overBgCls;
	});

	rowEl.addEventListener('mouseout', function(event) {
		this.className = this.baseCls + ' ' + this.defaultBgCls;
	});

	this.createRowCells(rowData, rowEl);

	return rowEl;
};

/**
 * Создание ячеек ряда таблицы.
 * @param rowData Данные ряда таблицы.
 * @param rowEl DOM-элемент ряда таблицы.
 */
DataGrid.prototype.createRowCells = function (rowData, rowEl) {
	for (var j = 0; j < this.columnsData.length; j++) {
		var columnData = this.columnsData[j];
		var cellEl;
		if (columnData.actionColumn) {
			cellEl = columnData.createCellElement();
		}
		else {
			var columnKey = columnData[this.COLUMN_NAME];
			var value = rowData[columnKey];
			cellEl = this.createCell(value, columnKey);
		}
		rowEl.appendChild(cellEl);
	}
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
		var getActionColumns = function (position) {
			var columns = this.actionColumns[position];
			return !isEmpty(columns) ? columns.length : 0;
		};
		count += getActionColumns('left').bind(this) +
				 getActionColumns('right').bind(this);
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
DataGrid.prototype.createCell = function (value, columnKey) {
	var cellEl = document.createElement('td');
	cellEl.setAttribute(this.CELL_ATTR, columnKey);
	cellEl.innerHTML = value;
	return cellEl;
};

DataGrid.prototype.setRowVisualState = function (rowEl, state) {
	switch (state) {
		case expression:

			break;
		default:

	}
};

/**
 * Получение DOM-элемента таблицы.
 * @return DOM-элемент таблиуы.
 */
DataGrid.prototype.getTableEl = function () {
	return getEl(this.domElement, this.TABLE_ATTR);
};
