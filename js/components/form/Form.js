/**
 * Форма.
 */
function Form () {
    Widget.apply(this, arguments);

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
    var items = this.getFormItemsConfig();
    for (var i = 0; i < items.length; i++) {
        var itemConfig = items[i];
        var itemUI = new itemConfig.ui(itemConfig);
        var itemEl = itemUI.getDomElement();
        this.domElement.appendChild(itemEl);
    }
};
