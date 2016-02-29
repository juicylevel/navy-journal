/**
 * Класс контстант приложения.
 */
var Consts = (function () {
	return {
		JOURNAL: 'journal',
		INDEX: 'index',
		DUTY_LIST_FRAME: 'dutyList',
		DUTY: 'duty',
		STATISTICS: 'statistics',
		DICTIONARY: 'dictionary',
		PROVISIONS: 'provisions',
		NAVIGATION: {
			index: [
		        {
		            label: 'Боевые дежурства',
		            icon: 'img/',
		            notificationType: Notifications.CALL_INDEX_MODULE
		        },
		        {
		            label: 'Статистика',
		            icon: 'img/',
		            notificationType: Notifications.CALL_STATISTICS_MODULE
		        },
		        {
		            label: 'Управление данными',
		            icon: 'img/',
		            notificationType: Notifications.CALL_DICTIONARY_MODULE
		        }
		    ],
			dictionary: [
				{
		            label: 'Провизия',
		            icon: 'img/',
		            notificationType: Notifications.CALL_PROVISION_DATA
		        },
				{
		            label: 'Технические ресурсы',
		            icon: 'img/',
		            notificationType: Notifications.CALL_TECHNICAL_DATA
		        }
			],
			duty: [
				{
		            label: 'Основные параметры',
		            icon: 'img/',
		            notificationType: Notifications.CALL_MAIN_DUTY_DATA
		        },
				{
		            label: 'Погода',
		            icon: 'img/',
		            notificationType: Notifications.CALL_WEATHER_DUTY_DATA
		        }
			]
		}
	};
})();
