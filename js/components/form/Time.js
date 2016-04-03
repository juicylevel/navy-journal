function Time () {
    TextField.apply(this, arguments);
};

extend(Time, FormItem);

/**
 * Создание поля ввода значения.
 */
Time.prototype.createField = function () {
    var fieldHtml = '' +
        '<select>' +
            '<option></option>' + 
        '</select>';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};
