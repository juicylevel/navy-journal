/**
 * Фрейм таблицы журнала боевых дежурств.
 */
function JournalGridFrame () {
    Widget.apply(this, arguments);

    this.paginator = null;
};

extend(JournalGridFrame, Widget);

/**
 * Отрисовка фрейма.
 */
JournalGridFrame.prototype.render = function () {
    this.domElement = document.createElement('div');

	this.createTools();
	this.createPaginator();

	return this.domElement;
};

/**
 * Инициализация фрейма.
 */
JournalGridFrame.prototype.init = function () {
    this.paginator.init();
};

/**
 * Создание панели инструментов.
 */
JournalGridFrame.prototype.createTools = function () {
	var html = '<div style="font-weight: bold;">Боевые дежурства:</div>';
	this.domElement.insertAdjacentHTML('afterbegin', html);
};

/**
 * Создания компонента для постраничного просмотра элементов таблицы.
 */
JournalGridFrame.prototype.createPaginator = function () {
	this.paginator = new Paginator(3/*Settings.getInstance().config.ui.journalGridPageSize*/);
    this.paginator.render();
	this.domElement.appendChild(this.paginator.getDomElement());
};

/**
 * Установка списка боевых дежурств.
 * @param dutyList Список боевых дежурств.
 */
JournalGridFrame.prototype.setDutyList = function (dutyList) {
    this.paginator.setData(dutyList.data, dutyList.count);
}
