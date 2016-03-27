function DateField () {
    TextField.apply(this, arguments);
};

extend(DateField, TextField);

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
