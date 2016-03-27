window.addEventListener('load', windowLoadEventHandler);

/**
 * Обработка события завершения полной загрузки страницы.
 * (включая внешние ресурсы)
 */
function windowLoadEventHandler (event) {
	initApplication();
};

/**
 * Инициализация приложения.
 */
function initApplication () {
	Notifier.getInstance().init();
	PopUp.getInstance().init();

	// TODO: попробовать Service сделать singleton-ом
	new Service().loadConfig('config.json').then(function (response) {
		Settings.getInstance().config = response;

		new Main();
	});
};

// TODO:
// 7. Отнаследовать View от Widget
// 5. Service сделать singleton-ом

// 2. Нужно ввести типы колонок (например, для тображения дат: в  списке дежурств и в аккумуляторах)
// 3. Кастомная колонка для даты завершения эксплуатации (если значение null, то показывать текст "используется")
// (пересмотреть механизм валидации) 4. Валидация полей формы (числа, даты), показ ошибки красным текстом, красной рамкой
// 5. Service сделать singleton-ом
// 6. Преобразование дат на сервере (предлагаю хранить в БД не datetime, а число с timestamp)
// 8. Формы в модальных окнах, редактирование аккумуляторов, провизии и типов провизии в окнах
// 9. Раздел типов провизии
