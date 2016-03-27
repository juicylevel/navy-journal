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
// 1. Не отображаются action-колонки
// 2. Нужно ввести типы колонок (например, для тображения дат: в  списке дежурств и в аккумуляторах)
// 3. Кастомная колонка для даты завершения эксплуатации (если значение null, то показывать текст "используется")
// 4. Валидация полей формы (числа, даты)
// 5. Service сделать singleton-ом
// 6. Преобразование дат на сервере (предлагаю хранить в БД не datetime, а число с timestamp)
