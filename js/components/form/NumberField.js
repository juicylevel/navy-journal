function NumberField (itemConfig) {
    this.min = itemConfig.min;
    this.max = itemConfig.max;
    TextField.apply(this, arguments);
};

extend(NumberField, TextField);

/**
 * Создание поля ввода значения.
 */
NumberField.prototype.createField = function () {
    var placeholder = this.itemConfig.placeholder;
    if (isEmpty(placeholder)) {
        placeholder = '';
    }

    var fieldHtml = '<input field type="number" placeholder="' + placeholder +
        '" style="width: ' + this.itemConfig.width + 'px;" min="' + this.min + '" max="' + this.max + '">';

    this.el.insertAdjacentHTML('beforeend', fieldHtml);
};
