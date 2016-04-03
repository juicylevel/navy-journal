function DateTime () {
    FormItem.apply(this, arguments);
};

extend(DateTime, FormItem);

/**
 * Создание поля ввода значения.
 */
DateTime.prototype.createField = function () {
    var dateField = new DateField();
    var timeField = new TimeField();

    dateField.el.className = 'formItemHLayout';
    timeField.el.className = 'formItemHLayout';

    this.el.appendChild(dateField.el);
    this.el.appendChild(timeField.el);
};
