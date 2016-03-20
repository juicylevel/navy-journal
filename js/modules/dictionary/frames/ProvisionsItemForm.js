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
            width: 250,
            required: true
        },
        {
            field: 'type_id',
            fieldLabel: 'Тип',
            ui: ComboBox,
            width: 200,
            required: true
        }
    ]
};

/**
 * Установка списка типов провизии.
 * @param provisionsTypes Список типов провизии.
 */
ProvisionsItemForm.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.getItem('type_id').setOptions(provisionsTypes);
};
