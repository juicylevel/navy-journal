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
    this.el = document.createElement('button');
    this.el.className = this.ownerLayout == 'vertical' ?
        'formItemVLayout' : 'formItemHLayout';
    this.el.innerHTML = this.text;

    // если к кнопке привязана форма, то до того момента,
    // как форма сообщит о своём статусе (валидность, изменённость данных)
    // блокируем кнопку по умолчанию (чтобы не мигала)
    if (!isEmpty(this.bindFormEl)) {
        this.el.disabled = true;
    }
};

/**
 * Конфигурация кнопки.
 */
Button.prototype.configure = function () {
    if (!isEmpty(this.bindFormEl)) {
        this.bindFormEl.addEventListener('changeform', (function (event) {
            if (this.role == 'save') {
                this.el.disabled = !event.detail.valid || !event.detail.dirty;
            }
            if (this.role == 'clear') {
                this.el.disabled = event.detail.empty;
            }
        }).bind(this));
    }
};
