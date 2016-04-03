function TimeField () {
    TextField.apply(this, arguments);
};

extend(TimeField, FormItem);

TimeField.prototype.createField = function () {
    var fieldHtml = '' +
        '<select hours>'   + this.getTimeOptions(0, 23, 'чч') + '</select>' +
        '<span style="padding: 3px;">:</span>' +
        '<select minutes>' + this.getTimeOptions(0, 59, 'мм') + '</select>' +
        '<span style="padding: 3px;">:</span>' +
        '<select seconds>' + this.getTimeOptions(0, 59, 'сс') + '</select>';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};

TimeField.prototype.getTimeOptions = function (from, to, placeholder) {
    var options = '<option value="">' + placeholder;
    for (var i = from; i <= to; i++) {
        options += '<option value="' + i + '">' + formatDoubleDigit(i) + '</option>';
    }
    return options;
};

TimeField.prototype.getValue = function () {
    var value = null;

    var hours = getEl(this.el, 'hours').value;
    var minutes = getEl(this.el, 'minutes').value;
    var seconds = getEl(this.el, 'seconds').value;

    if (!isEmpty(hours) && !isEmpty(minutes) && !isEmpty(seconds)) {
        value = hours * 3600 + minutes * 60 + seconds;
    }

    return value;
};

TimeField.prototype.setValue = function (value) {
    var hours = '', minutes = '', seconds = '';

    if (!isEmpty(value)) {
        var date = new Date(value * 1000);
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }

    getEl(this.el, 'hours').value = hours;
    getEl(this.el, 'minutes').value = minutes;
    getEl(this.el, 'seconds').value = seconds;

    FormItem.prototype.setValue.apply(this, arguments);
};
