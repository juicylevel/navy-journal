/**
 * Элемент формы.
 * @param fieldLabel Наименование элемента формы.
 */
function FormItem (itemConfig) {
    Widget.apply(this, arguments);

    this.itemConfig = itemConfig;
    this.originalValue = null;
    this.value = null;

    this.render();
};

extend(FormItem, Widget);

/**
 * Отрисовка элемента формы.
 */
FormItem.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.className = 'formItem';

    this.createFieldLabel();
    this.createField();
    this.createRequiredMarker();
};

/**
 * Создание элемента наименования поля.
 */
FormItem.prototype.createFieldLabel = function () {
    var fieldLabelHtml = '' +
        '<label class="fieldLabel" style="width: ' + this.itemConfig.labelWidth + 'px;">' +
            this.itemConfig.fieldLabel + ':' +
        '</label>';
    this.domElement.insertAdjacentHTML('beforeend', fieldLabelHtml);
};

/**
 * Создание поля ввода значения.
 */
FormItem.prototype.createField = function () {

};

/**
 * Создание маркера обязательности заполнения формы.
 */
FormItem.prototype.createRequiredMarker = function () {
    if (this.itemConfig.required) {
        var requiredHtml = '<span class="required"></span>';
        this.domElement.insertAdjacentHTML('beforeend', requiredHtml);
    }
};

/**
 * Установка значения.
 * @param value Значение элемента формы.
 */
FormItem.prototype.setValue = function (value) {

};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
FormItem.prototype.getValue = function () {

};

/**
 * Метод определяет, изменено ли значение элемента формы.
 * @return boolean
 */
FormItem.prototype.isDirty = function () {

};

/**
 * Метод определяет, валидно ли значение элемента формы.
 * @return boolean
 */
FormItem.prototype.isValid = function () {

};
