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
        '<select field style="width: ' + this.itemConfig.width + 'px;">' +
        '</select>';

    this.domElement.insertAdjacentHTML('beforeend', fieldHtml);

    // TODO: test
    this.setOptions([
        {value: 1, name: 'Вариант выбора 1'},
        {value: 2, name: 'Вариант выбора 2'},
        {value: 3, name: 'Вариант выбора 3'},
        {value: 4, name: 'Вариант выбора 4'},
        {value: 5, name: 'Вариант выбора 5'}
    ]);
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

    for (var i = 0; i < options.length; i++) {
        option = options[i];
        optionHtml = '<option value="' + option.value + '">' + option.name + '</option>';
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
