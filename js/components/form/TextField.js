/**
 * Поле ввода текста.
 */
function TextField () {
    FormItem.apply(this, arguments);
};

extend(TextField, FormItem);

/**
 * Отрисовка поля ввода текста.
 */
TextField.prototype.render = function () {
    FormItem.prototype.render.apply(this, arguments);

    var formItemHtml = '<input type="text" style="width: ' + this.width + 'px;">';

    this.domElement.insertAdjacentHTML('beforeend', formItemHtml);
};
