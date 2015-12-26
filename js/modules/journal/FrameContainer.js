/**
 * Контейнер фреймов журнала.
 */
function FrameContainer (domElement) {
	this.super(arguments);

	this.framesFactory = new FramesFactory();
};

ClassManager.getInstance().extend(FrameContainer, View);

/**
 * Получение списка обработчиков оповещений.
 */
FrameContainer.prototype.getHandlers = function () {
	return [
		{type: CHANGE_FRAME, handler: this.changeFrameHandler}
	];
};

/**
 * Обработка оповещения об изменении текущего фрейма пользовательского интерфейса.
 */
FrameContainer.prototype.changeFrameHandler = function (frameName) {
	this.showFrame(frameName);
};

/**
 * Отображение фрейма журнала.
 * @param frameName Наименование фрейма.
 */
FrameContainer.prototype.showFrame = function (frameName) {
	var frame = this.framesFactory.createFrame(frameName);
	this.add(frame);
};
