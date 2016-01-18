/**
 * Виджет для постраничного просмотра списков.
 */
function Paginator (pageSize) {
    Widget.apply(this, arguments);

    this.data = null;
    this.total = null;
    this.pageSize = pageSize;
	this.offset = 0;
	this.currentPage = 1;
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
	    	'Записи с <span fromRecord></span> по <span toRecord></span>' +
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

Paginator.prototype.init = function () {
    this.dispatchChangePageEvent();
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
 * Установка списка элементов.
 * @param data Список элементов.
 * @param total Общее количество элементов.
 */
Paginator.prototype.setData = function (data, total) {
    this.data = data;
    this.total = total;
    this.updateCurrentPage();
};

/**
 * Обработка события клика на кнопку "В начало".
 */
Paginator.prototype.onClickFirstPageButton = function () {
	this.offset = 0;
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
};

/**
 * Обработка события клика на кнопку "Назад".
 */
Paginator.prototype.onClickBackPageButton = function () {
	var pageSize = this.getPageSize();
	var newOffset = this.offset - pageSize;
	if (newOffset >= 0) {
		this.offset = newOffset;
		this.updateCurrentPage();
		this.dispatchChangePageEvent();
	}
};

/**
 * Обработка события клика на кнопку "Вперёд".
 */
Paginator.prototype.onClickNextPageButton = function () {
	var pageSize = this.getPageSize();
	var newOffset = this.offset + pageSize;
	if (newOffset <= this.total - 1) {
		this.offset = newOffset;
		this.updateCurrentPage();
		this.dispatchChangePageEvent();
	}
};

/**
 * Обработка события клика на кнопку "В конец".
 */
Paginator.prototype.onClickLastPageButton = function () {
	var pages = Math.ceil(this.total / this.getPageSize());
	this.offset = (pages - 1) * this.getPageSize();
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
};

/**
 * Обработка события клика на кнопку "Обновить".
 */
Paginator.prototype.onClickRefreshGridButton = function () {
	this.offset = 0;
	this.updateCurrentPage();
	this.dispatchChangePageEvent();
};

/**
 * Обработка события клика на кнопку "Перейти".
 */
Paginator.prototype.onClickGoToPageButton = function () {
	var currentPageInputEl = getEl(this.domElement, 'currentPageInput');
	var value = currentPageInputEl.value;

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
};

/**
 * Обработка события клавиатуры в фокусе поля ввода количества
 * записей на странице.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressPageSizeInput = function (event) {
	if (event.keyCode == 13) {
		this.onRefreshGridButton();
		this.updateCurrentPage();
	}
};

/**
 * Обработка события клавиатуры в фокусе поля ввода номера страницы.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressCurrentPageInput = function (event) {
	if (event.keyCode == 13) {
		this.onGoToPageButton();
	}
};

/**
 * Обновление текущей страницы.
 */
Paginator.prototype.updateCurrentPage = function () {
	this.currentPage = Math.ceil((this.offset + 1) / this.getPageSize());
	var currentPageInputEl = getEl(this.domElement, 'currentPageInput');
	currentPageInputEl.value = this.currentPage;
}

/**
 * Получение количества записей на странице.
 * @return Количество записей на текущей странице.
 */
Paginator.prototype.getPageSize = function () {
	var pageSizeInputEl = getEl(this.domElement, 'pageSizeInput');
	var value = pageSizeInputEl.value;

	if (isEmpty(value) || isNaN(parseInt(value))) {
		value = this.pageSize;
	}

	pageSize = parseInt(value);

	if (pageSize < 1) {
		pageSize = 1;
	} else if (!isEmpty(this.total) && pageSize > this.total) {
		pageSize = this.total;
	}

	pageSizeInputEl.value = pageSize;

	return pageSize;
};

/**
 * Отправка сообщения об изменении страницы.
 */
Paginator.prototype.dispatchChangePageEvent = function () {
	var event = new CustomEvent(
        CHANGE_PAGE,
        {
            detail: {
                offset: this.offset,
                pageSize: this.getPageSize()
            },
            bubbles: true
        }
    );
	this.domElement.dispatchEvent(event);
};
