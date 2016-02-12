/**
 * Представление модуля, состоящее из фреймов.
 */
function ModuleView () {
    View.apply(this, arguments);

    this.moduleTitle = 'Раздел';
    this.framesMap = {};

    this.frameTitleEl = null;
    this.frameContainerEl  = null;
};

extend(ModuleView, View);

/**
 * @see View.js
 */
ModuleView.prototype.render = function () {
    var moduleHtml = '' +
        '<div class="moduleHeader">' +
            '<span moduleTitle>' + this.moduleTitle + '</span>' +
            ' / ' +
            '<span frameTitle></span>' +
        '</div>' +
        '<div frameContainer></div>';

    this.domElement = document.createElement('div');
    this.domElement.setAttribute('module', this.moduleTitle);
    this.domElement.innerHTML = moduleHtml;

    this.frameTitleEl = getEl(this.domElement, 'frameTitle');
    this.frameContainerEl = getEl(this.domElement, 'frameContainer');
};

/**
 * Показ фрейма.
 * @param frameName Наименование фрейма.
 * @return Экземпляр фрейма.
 */
ModuleView.prototype.showFrame = function (frameName) {
	removeChilds(this.frameContainerEl);

    var frame = this.getFrame(frameName);

    var frameDomEl = frame.getDomElement();
    if (isEmpty(frameDomEl)) {
        frameDomEl = frame.render();
    }

    this.frameContainerEl.appendChild(frameDomEl);

    this.frameTitleEl.innerHTML = frame.name;

    frame.init();

	return frame;
};

/**
 * Получение фрейма по наименованию.
 * @param frameName Наименование фрейма.
 */
ModuleView.prototype.getFrame = function (frameName) {
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
ModuleView.prototype.createFrame = function (frameName) {
	return this['create' + capitalize(frameName) + 'Frame']();
};
