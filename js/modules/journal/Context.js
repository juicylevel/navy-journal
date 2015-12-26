/**
 * Контекст приложения.
 * Определяет текущее состояние приложение в рамках состава навигации и основного фрейма.
 */
function Context () {
	this.super(arguments);

	this.config = null;
	this.currentState = null;
}

ClassManager.getInstance().extend(Context, Model);

/**
 * Инициализация контекста журнала.
 */
Context.prototype.setConfig = function (config) {
	this.config = config;
}

/**
 * Применение состояния приложения.
 */
Context.prototype.applyState = function (state) {
	this.currentState = state;
	var navigationList = this.getNavigationList();

	var frameName = null;
	switch (state) {
		case INITIAL_STATE:
			frameName = JOURNAL_GRID_FRAME;
			break;
	}

	this.sendNotification(new Notification(CHANGE_NAVIGATION, navigationList));
	this.sendNotification(new Notification(CHANGE_FRAME, frameName));
}

/**
 * @private
 * Получение списка пунктов меню навигации.
 */
Context.prototype.getNavigationList = function () {
	var navigationList = [];
	var navigationConfig = this.config.navigation;

	for (var i = 0; i < navigationConfig.length; i++) {
		var navItem = navigationConfig[i];
		if (!isEmpty(getElement(navItem.states, this.currentState))) {
			navigationList.push(navItem);
		}
	}

	return navigationList;
}
