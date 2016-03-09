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
    var fieldHtml = '<input type="text" style="width: ' + this.itemConfig.width + 'px;">';
    this.domElement.insertAdjacentHTML('beforeend', fieldHtml);
};
