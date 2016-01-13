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

	this.domElement = document.createElement('div');
	this.domElement.className = 'paginator';
	this.domElement.innerHTML = paginatorHtml;
}
