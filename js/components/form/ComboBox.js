/**
 * Комбобокс.
 */
function ComboBox () {
    FormItem.apply(this, arguments);
};

extend(ComboBox, FormItem);

/**
 * Создание поля ввода значения.
 */
ComboBox.prototype.createField = function () {
    var fieldHtml = '' +
        '<select style="width: ' + this.itemConfig.width + 'px;">' +
            '<option value="">&nbsp;' + 
            '<option>Питьевая вода</option>' +
            '<option>Безалкогольный напиток</option>' +
            '<option>Пиво</option>' +
            '<option>Крепкий алкогольный напиток</option>' +
        '</select>';

    this.domElement.insertAdjacentHTML('beforeend', fieldHtml);
};

/**
 * Установка вариантов выбора.
 */
ComboBox.prototype.setOptions = function () {

};
