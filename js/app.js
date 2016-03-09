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

	var wnd = new Window('Форма', form.getDomElement(), {
		context: this,
		'Да': function () {
			console.log('Сохранение');
			setTimeout(function () {
				console.log('Сохранение завершено');
				PopUp.getInstance().removePopUp(wnd.getDomElement());
			}, 5000);
			return false;
		},
		'Нет': function () {
			Dialog.getInstance().show(Settings.getInstance().getCompleteDutyDialog(), {
				context: this,
				'Да': function () {
					//this.service.completeDuty();
				},
				'Нет': null
			});
			return true;
		}
	});

	PopUp.getInstance().show(wnd.getDomElement());
};
