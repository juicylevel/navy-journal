/**
 * Форма.
 */
function Form () {
    Widget.apply(this, arguments);

    this.formItems = null;

    this.render();
};

extend(Form, Widget);

/**
 * Получение конфигурации элементов формы.
 */
Form.prototype.getFormItemsConfig = function () {
    return [];
};

/**
 * Отрисовка формы.
 */
Form.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('form', '');

    this.createFields();
};

/**
 * Создание полей ввода.
 */
Form.prototype.createFields = function () {
    this.formItems = [];
    var items = this.getFormItemsConfig();
    for (var i = 0; i < items.length; i++) {
        var itemConfig = items[i];
        var itemUI = new itemConfig.ui(itemConfig);
        var itemEl = itemUI.getDomElement();
        this.domElement.appendChild(itemEl);
        itemEl.addEventListener(EventTypes.CHANGE_VALUE, this.onChangeValueFormItem.bind(this));
        this.formItems.push(itemUI);
    }

    this.dispatchValidationEvent(this.isValid());
};

/**
 * Обработка события изменения значения элемента формы.
 */
Form.prototype.onChangeValueFormItem = function (event) {

};

/**
 * Валидация формы.
 */
Form.prototype.isValid = function () {
    for (var i = 0; i < this.formItems.length; i++) {
        var formItem = this.formItems[i];
        if (!formItem.isValid()) {
            break;
        }
    }
};

Form.prototype.dispatchValidationEvent = function (isValid) {
    var validationEvent = new CustomEvent(
        EventTypes.VALIDATION,
        {
            detail: {
                isValid: isValid
            },
            bubbles: true
        }
    );
    this.domElement.dispatchEvent(validationEvent);
};
