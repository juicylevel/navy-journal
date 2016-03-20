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
    var labelWidth = this.itemConfig.labelWidth;
    var widthStyle = !isEmpty(labelWidth) ? labelWidth + 'px;' : 'auto;';
    var fieldLabelHtml = '' +
        '<label class="fieldLabel" style="width: ' + widthStyle + '">' +
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
FormItem.prototype.setValue = function (value, resetOriginal) {
    if (resetOriginal) {
        this.originalValue = value;
    }
    this.dispatchChangeEvent();
};

/**
 * Получение значения.
 * @return Значение элемента формы.
 */
FormItem.prototype.getValue = function () {

};

/**
 * Очистка элемента формы.
 */
FormItem.prototype.clear = function () {
    var fieldEl = getEl(this.domElement, 'field');
    fieldEl.value = '';    
    this.dispatchChangeEvent();
};

/**
 * Метод определяет, изменено ли значение элемента формы.
 * @return boolean
 */
FormItem.prototype.isDirty = function () {
    return this.getValue() != this.originalValue;
};

/**
 * Метод определяет, валидно ли значение элемента формы.
 * @return boolean
 */
FormItem.prototype.isValid = function () {
    if (this.itemConfig.required && isEmpty(this.getValue())) {
        return false;
    }
    return true;
};

/**
 * Отправка события об изменении значения.
 */
FormItem.prototype.dispatchChangeEvent = function () {
    var changeEvent = new CustomEvent(
		EventTypes.CHANGE_VALUE,
		{
			detail: {
                value: this.getValue()
            },
			bubbles: false
		}
	);
	this.domElement.dispatchEvent(changeEvent);
}
