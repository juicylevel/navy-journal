/**
 * Компонент таблицы.
 */
function DataGrid () {
	this.columnsData = [];
	this.rowsData = [];

	this.pageSize = DEFAULT_GRID_PAGE_SIZE;
	this.offset = 0;
	this.total = 29;
	this.currentPage = 1;

	this.render();
};

/**
 * Отрисовка таблицы.
 */
DataGrid.prototype.render = function () {
	this.domElement = document.createElement('div');
	this.domElement.className = 'dataGrid';
	var tableElement = document.createElement('table');

	this.domElement.appendChild(tableElement);

	var paggingTools = this.createPaggingTools();
	this.domElement.appendChild(paggingTools);

	return this.domElement;
}

DataGrid.prototype.setGridData = function (data) {
	var tableElement = this.domElement.getElementsByTagName('table')[0];

	if (!isEmpty(data.columns)) {
		this.columnsData = data.columns;

		var columnsElement = this.createColumns();
		tableElement.appendChild(columnsElement);
	}

	if (!isEmpty(data.rows)) {
		this.rowsData = data.rows;
		this.removeElements('gridRow', tableElement);
	}

	var columnElements = this.domElement.getElementsByClassName('gridHead');
	if (!isEmpty(columnElements)) {

	}

	var rowsElements = this.createRows();
	for (var i = 0; i < rowsElements.length; i++) {
		var rowElement = rowsElements[i];
		tableElement.appendChild(rowElement);
	}

	console.log('DataGrid.prototype.setGridData', data);
}

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
}

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
}

/**
 * Создание колоноки таблицы.
 */
DataGrid.prototype.createColumn = function (columnData) {
	var columnElement = document.createElement('td');
	var labelElement = document.createTextNode(columnData.label);
	columnElement.appendChild(labelElement);
	return columnElement;
}

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
			var value = rowData[columnData.index];
			var cellElement = document.createElement('td');
			var valueElement = document.createTextNode(value);
			cellElement.appendChild(valueElement);
			rowElement.appendChild(cellElement);
		}
		rowsElements.push(rowElement);
	}
	return rowsElements;
}

/**
 * Создание элементов пэйджинации.
 */
DataGrid.prototype.createPaggingTools = function () {
	var paggingToolsHtml = '' +
		'<div>' +
			'<span>Показывать по:</span>' +
	    	'<input type="text" class="pageSizeInput">' +
	    '</div>' +
	    '<div>' +
			'<button type="button" class="refreshGridButton">Обновить</button>' +
	    '</div>' +
		'<div>' +
		    '<button type="button" class="firstPageButton">В начало</button>' +
		    '<button type="button" class="backPageButton">Назад</button>' +
		    '<button type="button" class="nextPageButton">Вперёд</button>' +
		    '<button type="button" class="lastPageButton">В конец</button>' +
	    '</div>' +
	    '<div>' +
	    	'<input type="text" class="currentPageInput">' +
	    	'<button type="button" class="goToPageButton">Перейти</button>' +
	    '</div>' +
	    '<div>' +
	    	'<span>Записи с ' + 1 + ' по ' + 10 + '</span>' +
	    '</div>';

	var paggingToolsElement = document.createElement('div');
	paggingToolsElement.className = 'paggingTools';
	paggingToolsElement.innerHTML = paggingToolsHtml;

	var pageSizeInputElement = paggingToolsElement.getElementsByClassName('pageSizeInput')[0];
	pageSizeInputElement.value = this.pageSize;

	var currentPageInputElement = paggingToolsElement.getElementsByClassName('currentPageInput')[0];
	currentPageInputElement.value = this.currentPage;

	this.configurePaggingToolsButtons(paggingToolsElement, [
		'firstPageButton', 'backPageButton', 'nextPageButton',
		'lastPageButton', 'refreshGridButton', 'goToPageButton'
	]);

	var pageSizeInput = paggingToolsElement.getElementsByClassName('pageSizeInput')[0];
	pageSizeInput.addEventListener('keypress', this.onKeyDownPageSizeInput.bind(this));

	var currentPageInput = paggingToolsElement.getElementsByClassName('currentPageInput')[0];
	currentPageInput.addEventListener('keypress', this.onKeyDownCurrentPageInput.bind(this));

	return paggingToolsElement;
}

/**
 * Конфигурирование кнопок панели инструпентов.
 */
DataGrid.prototype.configurePaggingToolsButtons = function (ownerElement, buttons) {
	for (var buttonIndex in buttons) {
		var buttonName = buttons[buttonIndex];
		var buttonElement = ownerElement.getElementsByClassName(buttonName)[0];
		var handlerName = 'on' + capitalize(buttonName);
		buttonElement.addEventListener('click', this[handlerName].bind(this));
	}
}

/**
 * Обработка события клика на кнопку "В начало".
 */
DataGrid.prototype.onFirstPageButton = function () {
	this.offset = 0;
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Назад".
 */
DataGrid.prototype.onBackPageButton = function () {
	var pageSize = this.getPageSize();
	var newOffset = this.offset - pageSize;
	if (newOffset >= 0) {
		this.offset = newOffset;
		this.updateCurrentPage();
		this.dispatchChangePageEvent();
	}
}

/**
 * Обработка события клика на кнопку "Вперёд".
 */
DataGrid.prototype.onNextPageButton = function () {
	var pageSize = this.getPageSize();
	var newOffset = this.offset + pageSize;
	if (newOffset <= this.total - 1) {
		this.offset = newOffset;
		this.updateCurrentPage();
		this.dispatchChangePageEvent();
	}
}

/**
 * Обработка события клика на кнопку "В конец".
 */
DataGrid.prototype.onLastPageButton = function () {
	var pages = Math.ceil(this.total / this.getPageSize());
	this.offset = (pages - 1) * this.getPageSize();
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Обновить".
 */
DataGrid.prototype.onRefreshGridButton = function () {
	this.offset = 0;
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Перейти".
 */
DataGrid.prototype.onGoToPageButton = function () {
	var currentPageInputElement = this.domElement.getElementsByClassName('currentPageInput')[0];
	var value = currentPageInputElement.value;

	var minPage = 1;
	var maxPage = Math.ceil(this.total / this.getPageSize());

	if (isEmpty(value) || isNaN(parseInt(value))) {
		value = minPage;
	}

	page = parseInt(value);

	if (page < minPage) {
		page = minPage;
	}
	else if (page > maxPage) {
		page = maxPage;
	}

	this.offset = (page * this.getPageSize()) - this.getPageSize();

	this.updateCurrentPage();
	this.dispatchChangePageEvent();
}

DataGrid.prototype.onKeyDownPageSizeInput = function (event) {
	if (event.keyCode == 13) {
		this.onRefreshGridButton();
		this.updateCurrentPage();
	}
}

DataGrid.prototype.onKeyDownCurrentPageInput = function (event) {
	if (event.keyCode == 13) {
		this.onGoToPageButton();
	}
}

DataGrid.prototype.updateCurrentPage = function () {
	this.currentPage = Math.ceil((this.offset + 1) / this.getPageSize());
	var currentPageInputElement = this.domElement.getElementsByClassName('currentPageInput')[0];
	currentPageInputElement.value = this.currentPage;
}

DataGrid.prototype.getPageSize = function () {
	var pageSizeInputElement = this.domElement.getElementsByClassName('pageSizeInput')[0];
	var value = pageSizeInputElement.value;

	if (isEmpty(value) || isNaN(parseInt(value))) {
		value = DEFAULT_GRID_PAGE_SIZE;
	}

	pageSize = parseInt(value);

	if (pageSize < 1) {
		pageSize = 1;
	}
	else if (pageSize > this.total) {
		pageSize = this.total;
	}

	pageSizeInputElement.value = pageSize;

	return pageSize;
}

DataGrid.prototype.dispatchChangePageEvent = function () {
	var event = new CustomEvent(CHANGE_PAGE, {detail: {offset: this.offset, pageSize: this.getPageSize()}});
	this.domElement.dispatchEvent(event);
}
