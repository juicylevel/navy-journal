/**
 * Окно с шапкой, контентом и кнопками.
 */
function Window (title, contentEl, buttons, buttonsHandler) {
    Widget.apply(this, arguments);

    this.title = title;
    this.contentEl = contentEl;
    this.buttons = buttons;
    this.buttonsHandler = buttonsHandler;

    this.render();
};

extend(Window, Widget);

/**
 * Отрисовка окна.
 */
Window.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.className = 'windowBody';

    var windowHtml = '' +
        '<div class="title">' + this.title + '</div>' +
        '<div class="windowContainer" container></div>' +
        '<div buttons class="buttons"></div>';

    this.domElement.innerHTML = windowHtml;

    var containerEl = getEl(this.domElement, 'container');
    containerEl.appendChild(this.contentEl);

    var self = this,
        buttonsEl = getEl(this.domElement, 'buttons'),
        buttonConfig,
        buttonEl;

    for (var i in this.buttons) {
        buttonConfig = this.buttons[i];

        buttonEl = document.createElement('button');
        buttonEl.innerHTML = buttonConfig.btn;
        buttonEl.config = buttonConfig;

        buttonEl.addEventListener('click', function () {
            self.buttonsHandler(this.config.btn);
            if (isEmpty(this.config.close) || this.config.close) {
            	self.domElement.dispatchEvent(new CustomEvent(EventTypes.CLOSE));
            }
        });

        buttonsEl.appendChild(buttonEl);
    }
};
