/**
 * Кнопка формы.
 * @param text Надпись кнопки.
 * @param bindFormEl DOM-элемент привязанной формы.
 * @param display
 */
function Button (text, bindFormEl, display) {
    Widget.apply(this, arguments);

    this.text = text;
    this.bindFormEl = bindFormEl;
    this.display = display || 'block';

    this.render();
    this.configure();
};

extend(Button, Widget);

/**
 * Отрисовка кнопки.
 */
Button.prototype.render = function () {
    this.domElement = document.createElement('button');
    this.domElement.style.display = this.display;
    this.domElement.innerHTML = this.text;

    // если к кнопке привязана форма, то до того момента,
    // как форма сообщит о своём статусе (валидность, изменённость данных)
    // блокируем кнопку по умолчанию (чтобы не мигала)
    if (!isEmpty(this.bindFormEl)) {
        this.domElement.disabled = true;
    }
};

/**
 * Конфигурация кнопки.
 */
Button.prototype.configure = function () {
    if (!isEmpty(this.bindFormEl)) {
        this.bindFormEl.addEventListener(EventTypes.VALIDATION, (function (event) {
            this.domElement.disabled = event.valid;
        }).bind(this));
    }
};
