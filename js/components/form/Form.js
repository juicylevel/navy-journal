/**
 * Форма.
 * @param layout
 * @param display
 */
function Form (layout, display) {
    Widget.apply(this, arguments);

    this.layout = layout || 'vertical';
    this.display = display || 'block';
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
    this.domElement.style.display = this.display;
    //this.domElement.setAttribute('id', 'form-' + IDG.next().value);

    this.createFields();
};

/**
 * Создание полей ввода.
 */
Form.prototype.createFields = function () {
    var itemClass = this.layout == 'vertical' ? 'formItemVLayout' : 'formItemHLayout';

    this.formItems = [];
    var items = this.getFormItemsConfig();
    for (var i = 0; i < items.length; i++) {
        var itemConfig = items[i];
        var itemUI = new itemConfig.ui(itemConfig);
        var itemEl = itemUI.getDomElement();
        itemEl.className = itemClass;

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

/**
 * Отправка события валидации.
 * @param valid
 */
Form.prototype.dispatchValidationEvent = function (valid) {
    var validationEvent = new CustomEvent(
        EventTypes.VALIDATION,
        {
            detail: {
                valid: valid
            },
            bubbles: true
        }
    );
    this.domElement.dispatchEvent(validationEvent);
};
