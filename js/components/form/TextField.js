/**
 * Поле ввода текста.
 */
function TextField () {
    FormItem.apply(this, arguments);
};

extend(TextField, FormItem);

/**
 * Создание поля ввода значения.
 */
TextField.prototype.createField = function () {
    var placeholder = this.itemConfig.placeholder;
    if (isEmpty(placeholder)) {
        placeholder = '';
    }
    var fieldHtml = '<input field type="text" placeholder="' + placeholder + '" style="width: ' + this.itemConfig.width + 'px;">';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};

/**
 * Добавление прослушивателей событий.
 */
TextField.prototype.addListeners = function () {
    var fieldEl = getEl(this.el, 'field');
    fieldEl.addEventListener('input', (function () {
        this.dispatchChangeEvent();
    }).bind(this));
};

/**
 * Установка значения.
 * @param value Значение элемента формы.
 */
TextField.prototype.setValue = function (value) {
    var fieldEl = getEl(this.el, 'field');
    fieldEl.value = value;

    FormItem.prototype.setValue.apply(this, arguments);
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
TextField.prototype.getValue = function () {
    var fieldEl = getEl(this.el, 'field');
    return fieldEl.value;
};
