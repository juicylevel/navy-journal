/**
 * Форма редактирования элементов провизии.
 */
function ProvisionsForm () {
    Form.apply(this, arguments);
};

extend(ProvisionsForm, Form);

/**
 * Получение конфигурации элементов формы.
 */
ProvisionsForm.prototype.getFormItemsConfig = function () {
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
ProvisionsForm.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.getItem('type_id').setOptions(provisionsTypes);
};
