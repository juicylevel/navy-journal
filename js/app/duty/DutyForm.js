function DutyForm () {
    Form.apply(this, arguments);
};

extend(DutyForm, Form);

/**
* Получение конфигурации элементов формы.
*/
DutyForm.prototype.getFormItemsConfig = function () {
    return [
        // -- Общее --
        // Наименование
        // Начало дежурства
        // Время подготовки
        // Завершение дежурства

        // -- Метео условия --
        // Погода (солнечно, переменная облачность, ...)
        // Температура
        // Влажность
        // Давление
        // Скорость ветра
        // Направление ветра
        // Уровень воды
        // Загрязнённость воды
        // Температура воды
        // Общее описание

        // -- Аккумуляторы --
        // Список аккумуляторов (краткая форма) и кнопка редактирования

        // -- Провизия --
        // Список провизии (краткая форма) и кнопка редактирования

        // -- Боевая обстановка --
        // Военные наблюдатели (зеваки)
        // Уровень угрозы
        // Рассосредаточенность сил противника

        // -- Общее --
        {
            html: '<h3 style="margin: 10px 0px; font-style: italic;">Основные параметры:</h3>'
        },
        {
            field: 'name',
            fieldLabel: 'Наименование',
            placeholder: '',
            ui: TextField,
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'start_date',
            fieldLabel: 'Начало дежурства',
            placeholder: '',
            ui: TextField, //TODO: datetime
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'runup_time',
            fieldLabel: 'Время подготовки',
            placeholder: '',
            ui: TextField, //TODO: time
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'end_date',
            fieldLabel: 'Завершение дежурства',
            placeholder: '',
            ui: TextField, //TODO: datetime
            width: 300,
            labelWidth: 154,
            required: true
        },
        {
            field: 'description',
            fieldLabel: 'Общее описание',
            placeholder: '',
            ui: TextArea,
            width: 300,
            labelWidth: 154
        },

        // -- Метео условия --

        {
            html: '<h3 style="margin: 10px 0px; font-style: italic;">Метео условия:</h3>'
        },
        {
            field: 'weather_condition',
            fieldLabel: 'Погода',
            placeholder: '',
            ui: TextField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'temperature',
            fieldLabel: 'Температура',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'humidity',
            fieldLabel: 'Влажность',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'pressure',
            fieldLabel: 'Давление',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'wind_speed',
            fieldLabel: 'Скорость ветра',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'wind_direction',
            fieldLabel: 'Направление ветра',
            placeholder: '',
            ui: TextField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'water_level',
            fieldLabel: 'Уровень воды',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'water_purity',
            fieldLabel: 'Загрязнённость воды',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'water_temperature',
            fieldLabel: 'Температура воды',
            placeholder: '',
            ui: NumberField,
            width: 300,
            labelWidth: 154
        },
        {
            field: 'weather_description',
            fieldLabel: 'Общее описание',
            placeholder: '',
            ui: TextArea,
            width: 300,
            labelWidth: 154
        }
    ]
};
