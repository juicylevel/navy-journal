/**
 * Комбобокс.
 */
function ComboBox () {
    FormItem.apply(this, arguments);
};

extend(ComboBox, FormItem);

/**
 * Отрисовка комбобокса.
 */
ComboBox.prototype.render = function () {
    FormItem.prototype.render.apply(this, arguments);

    var formItemHtml = '' +
        '<select style="width: ' + this.width + 'px;">' +
            '<option>Питьевая вода</option>' +
            '<option>Безалкогольный напиток</option>' +
            '<option>Пиво</option>' +
            '<option>Крепкий алкогольный напиток</option>' +
        '</select>';

    this.domElement.insertAdjacentHTML('beforeend', formItemHtml);
};
