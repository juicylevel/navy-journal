/**
 * Окно с шапкой, контентом и кнопками.
 */
function Window (title, contentEl, buttons) {
    Widget.apply(this, arguments);

    this.title = title;
    this.contentEl = contentEl;
    this.buttons = buttons;

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
        buttonEl;

    for (var buttonName in this.buttons) {
        if (buttonName == 'context') continue;

        buttonEl = document.createElement('button');
        buttonEl.innerHTML = buttonName;
        buttonEl.buttonName = buttonName;
        buttonEl.addEventListener('click', function () {
            var closeWindow = true;
            var handler = self.buttons[this.buttonName];
            if (!isEmpty(handler)) {
                closeWindow = handler.call(self.buttons.context);
            }
            // закрываем окно, если handler ничего не вернул или вернул true
            // если вернул false, то окно не закрываем
            if (isEmpty(closeWindow) || closeWindow) {
            	self.domElement.dispatchEvent(new CustomEvent(EventTypes.CLOSE));
            }
        });

        buttonsEl.appendChild(buttonEl);
    }
};
