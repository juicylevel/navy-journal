/**
 * Панель навигации журнала.
 */
function JournalNavigation (domElement) {
	this.super(arguments);

	this.navigationList = [];
}

ClassManager.getInstance().extend(JournalNavigation, View);

/**
 * Получение списка обработчиков оповещений.
 */
JournalNavigation.prototype.getNotificationsHandlers = function () {
	return [
		{type: CHANGE_NAVIGATION, handler: this.changeNavigationHandler}
	];
}

/**
 * Обработка оповещения об изменении состава навигационных элементов.
 */
JournalNavigation.prototype.changeNavigationHandler = function (navigationList) {
	this.navigationList = navigationList;
	this.fillNavItems();
}

/**
 * Заполнение навигационного меню.
 */
JournalNavigation.prototype.fillNavItems = function () {
	for (var i = 0; i < this.navigationList.length; i++) {
		var navItemConfig = this.navigationList[i];
		var navItem = this.createNavItem(navItemConfig);
		this.domElement.insertAdjacentHTML('afterbegin', navItem);
	}
}

/**
 * Создание пункта меню панели навигации.
 * @param navItemConfig Конфигурация пункта меню.
 */
JournalNavigation.prototype.createNavItem = function (navItemConfig) {
	var html = '<div><a href="#' + navItemConfig.command + '">' + navItemConfig.label + '</a></div>';
	return html;
}
