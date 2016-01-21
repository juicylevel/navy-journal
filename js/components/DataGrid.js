/**
 * Компонент таблицы.
 */
function DataGrid (columnName, columnField, emptyGridMessage) {
	Widget.apply(this, arguments);

	this.emptyGridMessage = emptyGridMessage;
	this.columnName = columnName;
	this.columnField = columnField;
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

	var tableElement = document.createElement('table');
	this.domElement.appendChild(tableElement);

	return this.domElement;
};

DataGrid.prototype.setColumns = function (columns) {
	var tableElement = this.domElement.getElementsByTagName('table')[0];
	this.columnsData = columns;

	var columnsElement = this.createColumns();
	tableElement.appendChild(columnsElement);

	this.showEmptyRow(this.emptyGridMessage);//TODO: call from x ?
};

DataGrid.prototype.showEmptyRow = function (message) {
	var tableElement = this.domElement.getElementsByTagName('table')[0];
	var rowEl = document.createElement('tr');
	rowEl.className = 'gridRow';
	var cellEl = document.createElement('td');
	cellEl.style.textAlign = 'center';//TODO: to css
	var messageEl = document.createTextNode(message);
	cellEl.appendChild(messageEl);
	cellEl.setAttribute('colspan', this.columnsData.length);
	rowEl.appendChild(cellEl);
	tableElement.appendChild(rowEl);
};

DataGrid.prototype.setData = function (data) {
	var tableElement = this.domElement.getElementsByTagName('table')[0];
	if (!isEmpty(data)) {
		this.rowsData = data;
		this.removeElements('gridRow', tableElement);

		var rowsElements = this.createRows();
		for (var i = 0; i < rowsElements.length; i++) {
			var rowElement = rowsElements[i];
			tableElement.appendChild(rowElement);
		}
	}
};

/**
 * Установка данных таблицы.
 */
//  DataGrid.prototype.setGridData = function (data) {
// 	var tableElement = this.domElement.getElementsByTagName('table')[0];
//
// 	if (!isEmpty(data.columns)) {
// 		this.columnsData = data.columns;
//
// 		var columnsElement = this.createColumns();
// 		tableElement.appendChild(columnsElement);
// 	}
//
// 	if (!isEmpty(data.rows)) {
// 		this.rowsData = data.rows;
// 		this.removeElements('gridRow', tableElement);
// 	}
//
// 	var columnElements = this.domElement.getElementsByClassName('gridHead');
// 	if (!isEmpty(columnElements)) {
//
// 	}
//
// 	var rowsElements = this.createRows();
// 	for (var i = 0; i < rowsElements.length; i++) {
// 		var rowElement = rowsElements[i];
// 		tableElement.appendChild(rowElement);
// 	}
//
// 	console.log('DataGrid.prototype.setGridData', data);
// };

/**
 * Удаление элементов.
 */
DataGrid.prototype.removeElements = function (className, parentElement) {
	var elements = parentElement.getElementsByClassName(className);
	if (!isEmpty(elements)) {
		var targetElements = Array.prototype.slice.call(elements, 0);
		var length = targetElements.length;
		for (var i = 0; i < length; i++) {
		    parentElement.removeChild(targetElements[i]);
		}
	}
};

/**
 * Создание колонок таблицы.
 */
DataGrid.prototype.createColumns = function () {
	var columnsElement = document.createElement('tr');
	columnsElement.className = 'gridHead';
	for (var i = 0; i < this.columnsData.length; i++) {
		var columnData = this.columnsData[i];
		var columnElement = this.createColumn(columnData);
		columnsElement.appendChild(columnElement);
	}
	return columnsElement;
};

/**
 * Создание колоноки таблицы.
 */
DataGrid.prototype.createColumn = function (columnData) {
	var columnElement = document.createElement('td');
	var labelElement = document.createTextNode(columnData[this.columnField]);
	columnElement.appendChild(labelElement);
	return columnElement;
};

/**
 * Создание рядов таблицы.
 */
DataGrid.prototype.createRows = function () {
	var rowsElements = [];
	for (var i = 0; i < this.rowsData.length; i++) {
		var rowElement = document.createElement('tr');
		rowElement.className = 'gridRow';
		var rowData = this.rowsData[i];
		for (var j = 0; j < this.columnsData.length; j++) {
			var columnData = this.columnsData[j];
			var value = rowData[columnData[this.columnName]];
			var cellElement = document.createElement('td');
			var valueElement = document.createTextNode(value);
			cellElement.appendChild(valueElement);
			rowElement.appendChild(cellElement);
		}
		rowsElements.push(rowElement);
	}
	return rowsElements;
};
