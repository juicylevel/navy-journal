/**
 * Виджет для постраничного просмотра списков.
 */
function Paginator () {
    Widget.apply(this, arguments);
};

extend(Paginator, Widget);

/**
 * Отрисовка виджета.
 */
Paginator.prototype.render = function () {
    var paginatorHtml = '' +
		'<div>' +
			'<span>Показывать по:&nbsp;</span>' +
	    	'<input type="text" pageSizeInput>' +
	    '</div>' +
	    '<div>' +
			'<button type="button" refreshGridButton>Обновить</button>' +
	    '</div>' +
		'<div>' +
		    '<button type="button" firstPageButton>В начало</button>' +
		    '<button type="button" backPageButton>Назад</button>' +
		    '<button type="button" nextPageButton>Вперёд</button>' +
		    '<button type="button" lastPageButton>В конец</button>' +
	    '</div>' +
	    '<div>' +
	    	'<input type="text" currentPageInput>' +
	    	'<button type="button" goToPageButton>Перейти</button>' +
	    '</div>' +
	    '<div>' +
	    	'<span>Записи с ' + 1 + ' по ' + 10 + '</span>' +
	    '</div>';

	this.domElement = document.createElement('div');
	this.domElement.className = 'paginator';
	this.domElement.innerHTML = paginatorHtml;

    this.addEventListeners({
		'firstPageButton': 'click',
        'backPageButton': 'click',
        'nextPageButton': 'click',
		'lastPageButton': 'click',
        'refreshGridButton': 'click',
        'goToPageButton': 'click',
        'pageSizeInput': 'keypress',
        'currentPageInput': 'keypress'
	});
};

/**
 * Добавление прослушивателей событий элементам компонента.
 * @param eventElementsConfig Конфигурация.
 */
Paginator.prototype.addEventListeners = function (eventElementsConfig) {
    for (var elementAttribute in eventElementsConfig) {
        var element = getEl(this.domElement, elementAttribute);
        var eventType = eventElementsConfig[elementAttribute];
        var handlerName = 'on' + capitalize(eventType) + capitalize(elementAttribute);
		element.addEventListener(eventType, this[handlerName].bind(this));
    }
};

/**
 * Обработка события клика на кнопку "В начало".
 */
Paginator.prototype.onClickFirstPageButton = function () {
    console.log('onFirstPageButton');
	// this.offset = 0;
	// this.updateCurrentPage();
	// this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Назад".
 */
Paginator.prototype.onClickBackPageButton = function () {
    console.log('onBackPageButton');
	// var pageSize = this.getPageSize();
	// var newOffset = this.offset - pageSize;
	// if (newOffset >= 0) {
	// 	this.offset = newOffset;
	// 	this.updateCurrentPage();
	// 	this.dispatchChangePageEvent();
	// }
}

/**
 * Обработка события клика на кнопку "Вперёд".
 */
Paginator.prototype.onClickNextPageButton = function () {
    console.log('onNextPageButton');
	// var pageSize = this.getPageSize();
	// var newOffset = this.offset + pageSize;
	// if (newOffset <= this.total - 1) {
	// 	this.offset = newOffset;
	// 	this.updateCurrentPage();
	// 	this.dispatchChangePageEvent();
	// }
}

/**
 * Обработка события клика на кнопку "В конец".
 */
Paginator.prototype.onClickLastPageButton = function () {
    console.log('onLastPageButton');
	// var pages = Math.ceil(this.total / this.getPageSize());
	// this.offset = (pages - 1) * this.getPageSize();
	// this.updateCurrentPage();
	// this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Обновить".
 */
Paginator.prototype.onClickRefreshGridButton = function () {
    console.log('onRefreshGridButton');
	// this.offset = 0;
	// this.updateCurrentPage();
	// this.dispatchChangePageEvent();
}

/**
 * Обработка события клика на кнопку "Перейти".
 */
Paginator.prototype.onClickGoToPageButton = function () {
    console.log('onGoToPageButton');
	// var currentPageInputElement = this.domElement.getElementsByClassName('currentPageInput')[0];
	// var value = currentPageInputElement.value;
    //
	// var minPage = 1;
	// var maxPage = Math.ceil(this.total / this.getPageSize());
    //
	// if (isEmpty(value) || isNaN(parseInt(value))) {
	// 	value = minPage;
	// }
    //
	// page = parseInt(value);
    //
	// if (page < minPage) {
	// 	page = minPage;
	// }
	// else if (page > maxPage) {
	// 	page = maxPage;
	// }
    //
	// this.offset = (page * this.getPageSize()) - this.getPageSize();
    //
	// this.updateCurrentPage();
	// this.dispatchChangePageEvent();
}

/**
 * Обработка события клавиатуры в фокусе поля ввода количества
 * записей на странице.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressPageSizeInput = function (event) {
    console.log('onKeyDownPageSizeInput');
	// if (event.keyCode == 13) {
	// 	this.onRefreshGridButton();
	// 	this.updateCurrentPage();
	// }
}

/**
 * Обработка события клавиатуры в фокусе поля ввода номера страницы.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressCurrentPageInput = function (event) {
    console.log('onKeyDownCurrentPageInput');
	// if (event.keyCode == 13) {
	// 	this.onGoToPageButton();
	// }
}
