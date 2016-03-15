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
            placeholder: 'Введите наименование элемента провизии',
            ui: TextField,
            width: 300,
            required: true
        },
        {
            field: 'type',
            fieldLabel: 'Тип',
            ui: ComboBox,
            width: 150,
            required: true
        }
    ]
};
