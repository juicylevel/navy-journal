// Модули и фреймы
// Главный модуль приложения
var JOURNAL = 'journal';

var INDEX = 'index';
var DUTY_LIST_FRAME = 'dutyList';

var DUTY = 'duty';
var STATISTICS = 'statistics';
var DICTIONARY = 'dictionary';

// Навигация
var NAVIGATION = {
	index: [
        {
            label: 'Боевые дежурства',
            icon: 'img/',
            notificationType: CALL_INDEX_MODULE
        },
        {
            label: 'Статистика',
            icon: 'img/',
            notificationType: CALL_STATISTICS_MODULE
        },
        {
            label: 'Управление данными',
            icon: 'img/',
            notificationType: CALL_DICTIONARY_MODULE
        }
    ],
	dictionary: [
		{
            label: 'Провизия',
            icon: 'img/',
            notificationType: CALL_PROVISION_DATA
        },
		{
            label: 'Технические ресурсы',
            icon: 'img/',
            notificationType: CALL_TECHNICAL_DATA
        }
	],
	duty: [
		{
            label: 'Основные параметры',
            icon: 'img/',
            notificationType: CALL_MAIN_DUTY_DATA
        },
		{
            label: 'Погода',
            icon: 'img/',
            notificationType: CALL_WEATHER_DUTY_DATA
        }
	]
};
