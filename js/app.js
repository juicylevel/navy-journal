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

	var journalModule = ModuleManager.getInstance().getModule(Consts.JOURNAL);
	journalModule.view.render();


	var form = new ProvisionsItemForm();

	var wnd = new FormWindow('Форма', form.getDomElement(), [
		{btn: 'Сохранить', close: false, role: 'save'},
		{btn: 'Отмена'}
	], (function (btn) {
		switch (btn) {
			case 'Сохранить':
				break;
			case 'Отмена':
				break;
		}
	}).bind(this));

	PopUp.getInstance().show(wnd.getDomElement());
};
