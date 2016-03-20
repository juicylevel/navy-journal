/**
 * Комбобокс.
 */
function ComboBox () {
    FormItem.apply(this, arguments);

    this.valueField = this.itemConfig.valueField || 'id';
    this.displayField = this.itemConfig.displayField || 'name';
};

extend(ComboBox, FormItem);

/**
 * Создание поля ввода значения.
 */
ComboBox.prototype.createField = function () {
    var fieldHtml = '' +
        '<select field style="width: ' + this.itemConfig.width + 'px;">' +
        '</select>';

    this.domElement.insertAdjacentHTML('beforeend', fieldHtml);

    var fieldEl = getEl(this.domElement, 'field');
    fieldEl.addEventListener('change', (function () {
        this.dispatchChangeEvent();
    }).bind(this));
};

/**
 * Установка вариантов выбора.
 */
ComboBox.prototype.setOptions = function (options) {
    var fieldEl = getEl(this.domElement, 'field'),
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
    var fieldEl = getEl(this.domElement, 'field');
    fieldEl.value = value;

    FormItem.prototype.setValue.apply(this, arguments)
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
ComboBox.prototype.getValue = function () {
    var fieldEl = getEl(this.domElement, 'field');
    return fieldEl.value;
};
