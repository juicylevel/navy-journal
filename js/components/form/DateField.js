function DateField () {
    FormItem.apply(this, arguments);
};

extend(DateField, FormItem);

DateField.prototype.createField = function () {
    var fieldHtml = '' +
        '<select day>'   + this.getDateOptions(1, 31, 'дд') + '</select>' +
        '<span style="padding: 3px;">.</span>' +
        '<select month>' + this.getDateOptions(1, 12, 'мм') + '</select>' +
        '<span style="padding: 3px;">.</span>' +
        '<select year>' + this.getDateOptions(2012, 2050, 'гггг') + '</select>';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};

DateField.prototype.getDateOptions = function (from, to, placeholder) {
    var options = '<option value="">' + placeholder;
    for (var i = from; i <= to; i++) {
        options += '<option value="' + i + '">' + formatDoubleDigit(i) + '</option>';
    }
    return options;
};

/**
 * Установка значения.
 * @param value Значение элемента формы.
 */
DateField.prototype.setValue = function (value) {
    var day = '', month = '', year = '';

    if (!isEmpty(value)) {
        var date = new Date(value * 1000);
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
    }

    getEl(this.el, 'day').value = day;
    getEl(this.el, 'month').value = month;
    getEl(this.el, 'year').value = year;

    FormItem.prototype.setValue.apply(this, arguments);
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
DateField.prototype.getValue = function () {
    var value = null;

    var day = getEl(this.el, 'day').value;
    var month = getEl(this.el, 'month').value;
    var year = getEl(this.el, 'year').value;

    if (!isEmpty(day) && !isEmpty(month) && !isEmpty(year)) {
        value = new Date(year, month, day).getTime() / 1000;
    }

    return value;
};
