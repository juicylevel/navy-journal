/**
 * Форма редактирования элементов провизии.
 */
function ProvisionsItemForm () {
    Form.apply(this, arguments);
};

extend(ProvisionsItemForm, Form);

/**
 * Получение конфигурации элементов формы.
 */
ProvisionsItemForm.prototype.getFormItemsConfig = function () {
    return [
        {
            field: 'name',
            fieldLabel: 'Наименование',
            ui: TextField,
            labelWidth: 90,
            width: 146,
            required: true
        },
        {
            field: 'type',
            fieldLabel: 'Тип',
            ui: ComboBox,
            labelWidth: 90,
            width: 150,
            required: true
        }
    ]
};
