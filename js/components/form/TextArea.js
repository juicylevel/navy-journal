function TextArea () {
    TextField.apply(this, arguments);
};

extend(TextArea, TextField);

/**
 * Создание поля ввода значения.
 */
TextArea.prototype.createField = function () {
    var placeholder = this.itemConfig.placeholder;
    if (isEmpty(placeholder)) {
        placeholder = '';
    }
    var fieldHtml = '<textarea rows="4" field placeholder="' + placeholder +
        '" style="width: ' + this.itemConfig.width + 'px;"></textarea>';
    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};
