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
    this.formData = {};

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
    this.el = document.createElement('div');
    this.el.style.display = this.display;

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
        itemUI.el.className = itemClass;

        this.el.appendChild(itemUI.el);
        itemUI.el.addEventListener('changevalue', this.onChangeValueFormItem.bind(this));
        this.formItems.push(itemUI);
    }
};

/**
 * Обработка события изменения значения элемента формы.
 */
Form.prototype.onChangeValueFormItem = function (event) {
    this.dispatchChangeEvent();
};

/**
 * Валидация формы.
 */
Form.prototype.isValid = function () {
    for (var i = 0; i < this.formItems.length; i++) {
        var formItem = this.formItems[i];
        if (!formItem.isValid()) {
            return false;
        }
    }
    return true;
};

/**
 * Получение элемента формы по имени поля.
 * @param fieldName Наименование поля.
 */
Form.prototype.getItem = function (fieldName) {
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        if (formItem.itemConfig.field == fieldName) {
            return formItem;
        }
    }
};

/**
 * Получение значений полей формы.
 */
Form.prototype.getValues = function () {
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        var fieldName = formItem.itemConfig.field;

        if (formItem.isDirty()) {
            this.formData[fieldName] = formItem.getValue();
        }
    }
    return this.formData;
};

/**
 * Установка значений полей формы.
 * @param data Объект со значениями полй формы.
 */
Form.prototype.setValues = function (data) {
    this.formData = data;

    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        var fieldName = formItem.itemConfig.field;

        if (this.formData.hasOwnProperty(fieldName)) {
            formItem.setValue(this.formData[fieldName], true);
        }
    }
};

/**
 * Очистка формы.
 */
Form.prototype.clear = function () {
    this.formData = {};
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        formItem.clear();
    }
};

/**
 * Проверка, пустая ли форма.
 * @return boolean
 */
Form.prototype.isEmpty = function () {
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        if (!isEmpty(formItem.getValue())) {
            return false;
        }
    }
    return true;
};

/**
 * Проверка, были ли изменения значений полей формы.
 * @return boolean
 */
Form.prototype.isDirty = function () {
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        if (formItem.isDirty()) {
            return true;
        }
    }
    return false;
};

/**
 * Отправка события валидации.
 */
Form.prototype.dispatchChangeEvent = function () {
    var changeform = new CustomEvent('changeform', {
        detail: {
            valid: this.isValid(),
            dirty: this.isDirty(),
            empty: this.isEmpty()
        }
    });
    this.el.dispatchEvent(changeform);
};
