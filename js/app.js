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
	Dialog.getInstance().init();

	var journalModule = ModuleManager.getInstance().getModule(Consts.JOURNAL);
	journalModule.view.render();
};
