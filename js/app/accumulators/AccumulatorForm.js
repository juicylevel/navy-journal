function AccumulatorForm () {
    Form.apply(this, arguments);
};

extend(AccumulatorForm, Form);

/**
* Получение конфигурации элементов формы.
*/
AccumulatorForm.prototype.getFormItemsConfig = function () {
    return [
        {
            field: 'name',
            fieldLabel: 'Наименование',
            placeholder: 'марка аккумулятора',
            ui: TextField,
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'voltage',
            fieldLabel: 'Напряжение',
            placeholder: 'вольты',
            ui: TextField,
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'capacity',
            fieldLabel: 'Ёмкость',
            placeholder: 'мАч',
            ui: TextField,
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'start_exploitation',
            fieldLabel: 'Начало эксплуатации',
            placeholder: 'дд.мм.гггг',
            ui: DateField,
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'end_exploitation',
            fieldLabel: 'Завершение эксплуатации',
            placeholder: 'дд.мм.гггг',
            ui: DateField,
            width: 300,
            labelWidth: 154,
            required: false
        }
    ]
};
