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
            width: 200,
            required: true
        }
    ]
};

ProvisionsItemForm.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.getItem('type').setOptions(provisionsTypes);
};

ProvisionsItemForm.prototype.getItem = function (fieldName) {
    for (var i in this.formItems) {
        var formItem = this.formItems[i];
        if (formItem.itemConfig.field == fieldName) {
            return formItem;
        }
    }
};
