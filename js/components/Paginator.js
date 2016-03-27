/**
 * Виджет для постраничного просмотра списков.
 */
function Paginator (maxPageSize) {
    Widget.apply(this, arguments);

    this.data = null;
    this.total = null;
    this.maxPageSize = maxPageSize || 10;
    this.pageSize = 0;
	this.offset = 0;
	this.currentPage = 1;

    this.render();
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
	    '</div>' +
        '<div>' +
	    	'Всего: <span total></span>' +
	    '</div>';

	this.el = document.createElement('div');
	this.el.className = 'paginator';
	this.el.innerHTML = paginatorHtml;

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
 * Обновление.
 */
Paginator.prototype.refresh = function () {
    this.offset = 0;
	this.dispatchChangePageEvent();
};

/**
 * Добавление прослушивателей событий элементам компонента.
 * @param eventElementsConfig Конфигурация.
 */
Paginator.prototype.addEventListeners = function (eventElementsConfig) {
    for (var elementAttribute in eventElementsConfig) {
        var element = getEl(this.el, elementAttribute);
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
    this.updateDisplayValues();
};

/**
 * Обработка события клика на кнопку "В начало".
 */
Paginator.prototype.onClickFirstPageButton = function () {
	this.offset = 0;
	this.updateDisplayValues();
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
		this.updateDisplayValues();
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
		this.updateDisplayValues();
		this.dispatchChangePageEvent();
	}
};

/**
 * Обработка события клика на кнопку "В конец".
 */
Paginator.prototype.onClickLastPageButton = function () {
	var pages = Math.ceil(this.total / this.getPageSize());
	this.offset = (pages - 1) * this.getPageSize();
	this.updateDisplayValues();
	this.dispatchChangePageEvent();
};

/**
 * Обработка события клика на кнопку "Обновить".
 */
Paginator.prototype.onClickRefreshGridButton = function () {
	this.refresh();
};

/**
 * Обработка события клика на кнопку "Перейти".
 */
Paginator.prototype.onClickGoToPageButton = function () {
	var currentPageInputEl = getEl(this.el, 'currentPageInput');
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

	this.updateDisplayValues();
	this.dispatchChangePageEvent();
};

/**
 * Обработка события клавиатуры в фокусе поля ввода количества
 * записей на странице.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressPageSizeInput = function (event) {
	if (event.keyCode == 13) {
		this.refresh();
	}
};

/**
 * Обработка события клавиатуры в фокусе поля ввода номера страницы.
 * @param event Объект события.
 */
Paginator.prototype.onKeypressCurrentPageInput = function (event) {
	if (event.keyCode == 13) {
		this.onClickGoToPageButton();
	}
};

/**
 * Обновление отображаемых значений на панели компонента.
 */
Paginator.prototype.updateDisplayValues = function () {
    var currentPageInputEl = getEl(this.el, 'currentPageInput');
    var totalEl = getEl(this.el, 'total');
    var fromRecordEl = getEl(this.el, 'fromRecord');
    var toRecordEl = getEl(this.el, 'toRecord');

    this.currentPage = Math.ceil((this.offset + 1) / this.getPageSize());
    currentPageInputEl.value = this.currentPage;
    totalEl.innerHTML = this.total;
    fromRecordEl.innerHTML = this.offset + 1;
    toRecordEl.innerHTML = this.offset + (!isEmpty(this.data) ? this.data.length : 0);
}

/**
 * Получение количества записей на странице.
 * @return Количество записей на текущей странице.
 */
Paginator.prototype.getPageSize = function () {
	var pageSizeInputEl = getEl(this.el, 'pageSizeInput');
	var value = pageSizeInputEl.value;

	if (isEmpty(value) || isNaN(parseInt(value))) {
		value = this.maxPageSize;
	}

	pageSize = parseInt(value);

	if (pageSize < 1) {
		pageSize = 1;
	} else if (!isEmpty(this.total) && pageSize > this.total) {
		pageSize = this.total;
	}

	pageSizeInputEl.value = pageSize;

    // TODO: replace getPageSize on updatePageSize
    this.pageSize = pageSize;

	return pageSize;
};

/**
 * Отправка сообщения об изменении страницы.
 */
Paginator.prototype.dispatchChangePageEvent = function () {
	var changePageEvent = new CustomEvent('changepage', {
        detail: {
            offset: this.offset,
            pageSize: this.getPageSize()
        }
    });
	this.el.dispatchEvent(changePageEvent);
};
