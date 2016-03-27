function DateField () {
    FormItem.apply(this, arguments);
};

extend(DateField, FormItem);

/**
 * Создание поля ввода значения.
 */
DateField.prototype.createField = function () {
    var placeholder = this.itemConfig.placeholder;
    if (isEmpty(placeholder)) {
        placeholder = '';
    }
    var fieldHtml = '<input field type="text" placeholder="' + placeholder + '" style="width: ' + this.itemConfig.width + 'px;">';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);

    var fieldEl = getEl(this.el, 'field');
    fieldEl.addEventListener('input', (function () {
        this.dispatchChangeEvent();
    }).bind(this));
};

/**
 * Установка значения.
 * @param value Значение элемента формы.
 */
DateField.prototype.setValue = function (value) {
    var fieldEl = getEl(this.el, 'field');
    var fieldValue = !isEmpty(value) ? getDateString(value) : '';
    fieldEl.value = fieldValue;

    FormItem.prototype.setValue.apply(this, arguments);
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
DateField.prototype.getValue = function () {
    var fieldEl = getEl(this.el, 'field');
    var fieldValue = fieldEl.value;

    var timeValue = null;
    if (!isEmpty(fieldValue)) {
        timeValue = dateStringToTime(fieldValue);
    }

    return timeValue;
};
