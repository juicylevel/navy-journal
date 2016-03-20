/**
 * Кнопка формы.
 * @param text Надпись кнопки.
 * @param bindFormEl DOM-элемент привязанной формы.
 * @param layout
 */
function Button (text, bindFormEl, role, ownerLayout) {
    Widget.apply(this, arguments);

    this.text = text;
    this.bindFormEl = bindFormEl;
    this.role = role;
    this.ownerLayout = ownerLayout || 'vertical';

    this.render();
    this.configure();
};

extend(Button, Widget);

/**
 * Отрисовка кнопки.
 */
Button.prototype.render = function () {
    this.domElement = document.createElement('button');
    this.domElement.className = this.ownerLayout == 'vertical' ?
        'formItemVLayout' : 'formItemHLayout';
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
        this.bindFormEl.addEventListener(EventTypes.CHANGE_FROM, (function (event) {
            if (this.role == 'save') {
                this.domElement.disabled = !event.detail.valid || !event.detail.dirty;
            }
            if (this.role == 'clear') {
                this.domElement.disabled = event.detail.empty;
            }
        }).bind(this));
    }
};
