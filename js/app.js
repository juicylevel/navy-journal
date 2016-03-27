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
