/**
 * Форма.
 */
function Form () {
    Widget.apply(this, arguments);

    this.render();
};

extend(Form, Widget);

Form.prototype.getFormConfig = function () {
    return [
        {
            ui: Container,
            layout: 'vertical',
            items: [
                {
                    field: 'name',
                    fieldLabel: 'Наименование',
                    ui: TextField,
                    labelWidth: 90,
                    width: 146
                },
                {
                    field: 'type',
                    fieldLabel: 'Тип',
                    ui: ComboBox,
                    labelWidth: 90,
                    width: 150
                }
            ]
        }
    ]
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
    var createItems = function (items, parentEl) {
        for (var i = 0; i < items.length; i++) {
            var itemConfig = items[i];
            var itemUI = new itemConfig.ui(itemConfig.fieldLabel, itemConfig.labelWidth, itemConfig.width);
            var itemEl = itemUI.getDomElement();

            parentEl.appendChild(itemUI.getDomElement());
            if (!isEmpty(itemConfig.items)) {
                createItems.call(this, itemConfig.items, itemUI.getDomElement());
            }
        }
    };

    createItems.call(this, this.getFormConfig(), this.domElement);
};
