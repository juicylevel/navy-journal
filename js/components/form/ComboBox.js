/**
 * Комбобокс.
 */
function ComboBox (itemConfig) {
    this.valueField = itemConfig.valueField || 'id';
    this.displayField = itemConfig.displayField || 'name';
    this.options = itemConfig.options || [];

    FormItem.apply(this, arguments);
};

extend(ComboBox, FormItem);

/**
 * Создание поля ввода значения.
 */
ComboBox.prototype.createField = function () {
    var fieldHtml = '' +
        '<select field style="width: ' + this.itemConfig.width + 'px;">' +
        '</select>';

    this.el.insertAdjacentHTML('beforeend', fieldHtml);

    var fieldEl = getEl(this.el, 'field');
    fieldEl.addEventListener('change', (function () {
        this.dispatchChangeEvent();
    }).bind(this));

    if (!isEmpty(this.options)) {
        this.setOptions(this.options);
    }
};

/**
 * Установка вариантов выбора.
 */
ComboBox.prototype.setOptions = function (options) {
    var fieldEl = getEl(this.el, 'field'),
        option,
        optionHtml;

    var deselectOptionHtml = '<option value="">&nbsp;';
    fieldEl.insertAdjacentHTML('beforeend', deselectOptionHtml);

    for (var i in options) {
        option = options[i];
        optionHtml = '<option value="' + option[this.valueField] + '">' + option[this.displayField] + '</option>';
        fieldEl.insertAdjacentHTML('beforeend', optionHtml);
    }
};

/**
 * Установка значения.
 * @param value Значение элемента формы.
 */
ComboBox.prototype.setValue = function (value) {
    var fieldEl = getEl(this.el, 'field');
    fieldEl.value = value;

    FormItem.prototype.setValue.apply(this, arguments)
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
ComboBox.prototype.getValue = function () {
    var fieldEl = getEl(this.el, 'field');
    return fieldEl.value;
};
