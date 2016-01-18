/**
 * Базовый класс представления.
 * Принимает опопвещения для обновления состояния пользовательского интерфейса,
 * отображаемых данных. Отправляет оповещения о событиях пользовательского
 * интерфейса.
 */
function View (domElement) {
	Receiver.apply(this, arguments);

	this.domElement = domElement;

	this.frames = [];
	this.frameContainerEl;
	this.framesMap = {};
};

extend(View, Receiver);

/**
 * Отрисовка компонента.
 */
View.prototype.render = function () {

};

/**
 * Показ фрейма.
 * @param frameName Наименование фрейма.
 * @return Экземпляр фрейма.
 */
View.prototype.showFrame = function (frameName) {
	var frame = this.getFrame(frameName);
	removeChilds(this.frameContainerEl);
    this.frameContainerEl.appendChild(frame.getDomElement());
	return frame;
};

/**
 * Получение фрейма по наименованию.
 * @param frameName Наименование фрейма.
 */
View.prototype.getFrame = function (frameName) {
	var frame = null;
    if (isEmpty(this.framesMap[frameName])) {
        frame = this.createFrame(frameName);
		this.framesMap[frameName] = frame;
    } else {
        frame = this.framesMap[frameName];
    }
	return frame;
};

/**
 * Создание DOM-элемента фрейма.
 * @param frameName Наименование фрейма.
 */
View.prototype.createFrame = function (frameName) {
	return this['create' + capitalize(frameName) + 'Frame']();
};
