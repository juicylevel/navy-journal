/**
 * Представление журнала.
 * Включает в себя стартовый диалог, панель навигации, контейнер фреймов,
 * верхнюю панель со статусом дежурства.
 */
function JournalView (domElement) {
    View.apply(this, arguments);

    this.durationTimer;
};

extend(JournalView, View);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
JournalView.prototype.getHandlers = function () {
	return [
		{type: CHANGE_LAST_DUTY_INFO, handler: this.onChangeLastDutyInfo},
        {type: CHANGE_ACTIVE_DUTY_INFO, handler: this.onChangeActiveDutyInfo},
        {type: CHANGE_SYSTEM_MENU, handler: this.onChangeSystemMenu},
        {type: CHANGE_MODULE_MENU, handler: this.onChangeModuleMenu}
	];
};

/**
 * Отрисовка компонента.
 */
JournalView.prototype.render = function () {
    this.domElement = document.getElementById('content');

    var journalUIHtml = '' +
        '<div id="layoutBody">' +
            '<header id="header">'+
                '<div class="lastDutyInfo" last-duty-info>' +
                    '<span>Последнее дежурство:&nbsp;</span>' +
                    '<span last-duty-date>-</span>' +
                    '<span>&nbsp;Длительность:&nbsp;</span>' +
                    '<span last-duty-duration>-</span>' +
                '</div>' +
                '<div class="activeDutyInfo" active-duty-info style="display: none;">' +
                    '<span>Начало дежурства:&nbsp;</span>' +
                    '<span active-duty-start-date>-</span>' +
                    '<span>&nbsp;Время подготовки:&nbsp;</span>' +
                    '<span run-up-time>-</span>' +
                    '<span>&nbsp;Время дежурства:&nbsp;</span>' +
                    '<span duty-duration>-</span>' +
                '</div>' +
                '<div class="clearBoth"></div>' +
            '</header>' +
            '<nav id="navigationPanel">' +
                '<div id="navigation" menu>' +
                    '<div system-menu></div>' +
                    '<div module-menu></div>' +
                '</div>' +
            '</nav>' +
            '<section id="frameContainer">' +

            '</section>' +
            '<footer id="footer"></footer>' +
        '</div>';

    this.domElement.innerHTML = journalUIHtml;

    new JournalLayout();

    this.sendNotification(new Notification(VIEW_READY));
};

/**
 * Обработка оповещения об изенении информации о последнем дежурстве.
 * @param lastDutyInfo Информация о последнем завершённом дежурстве.
 */
JournalView.prototype.onChangeLastDutyInfo = function (lastDutyInfo) {
    if (!isEmpty(lastDutyInfo)) {
        var lastDutyDateEl = getEl(this.domElement, 'last-duty-date');
        var lastDutyDurationEl = getEl(this.domElement, 'last-duty-duration');
        lastDutyDateEl.innerHTML = getDateString(lastDutyInfo.date);
        lastDutyDurationEl.innerHTML = getDurationString(lastDutyInfo.duration);
    }
};

/**
 * Обработка события изенения информации об активном (текущем) дежурстве.
 * @param activeDutyInfo Информация об активном (текущем) дежурстве.
 */
JournalView.prototype.onChangeActiveDutyInfo = function (activeDutyInfo) {
    var activeDutyInfoEl = getEl(this.domElement, 'active-duty-info');
    clearInterval(this.durationTimer);

    if (!isEmpty(activeDutyInfo)) {
        var activeDutyStartDateEl = getEl(this.domElement, 'active-duty-start-date');
        activeDutyStartDateEl.innerHTML = getDateString(activeDutyInfo.date);

        var duration = activeDutyInfo.duration;

        var dutyDurationEl = getEl(this.domElement, 'duty-duration');
        dutyDurationEl.innerHTML = getDurationString(duration);

        var runUpTimeEl = getEl(this.domElement, 'run-up-time');
        runUpTimeEl.innerHTML = getDurationString(activeDutyInfo.runUpTime);

        this.durationTimer = setInterval(function () {
            duration++;
            dutyDurationEl.innerHTML = getDurationString(duration);
            if (activeDutyInfo.runUp) {
                runUpTimeEl.innerHTML = getDurationString(duration);
            }
        }, 1000);

        activeDutyInfoEl.style.display = 'block';
    } else {
        activeDutyInfoEl.style.display = 'none';
    }
};

/**
 * Обработка оповещения об изенении состава системного меню приложения.
 * @param moduleMenu Список пунктов системного меню.
 */
JournalView.prototype.onChangeSystemMenu = function (systemMenu) {
    var systemMenuEl = getEl(this.domElement, 'system-menu');
    this.createMenu(systemMenu, systemMenuEl);
};

/**
 * Обработка оповещения об изенении состава меню модуля приложения.
 * @param moduleMenu Список пунктов меню модуля.
 */
JournalView.prototype.onChangeModuleMenu = function (moduleMenu) {
    var moduleMenuEl = getEl(this.domElement, 'module-menu');
    this.createMenu(moduleMenu, moduleMenuEl);
};

/**
 * Создание меню.
 * @param menuItems Список пунктов меню.
 * @param menuEl DOM-элемент контейнера меню.
 */
JournalView.prototype.createMenu = function (menuItems, menuEl) {
    removeChilds(menuEl);

    var menuItem,
        menuItemEl,
        i,
        itemsCount = menuItems.length,
        self = this;

    for (i = 0; i < itemsCount; i++) {
        menuItem = menuItems[i];
        menuItemEl = this.createMenuItemElement(menuItem);
        menuItemEl.menuItem = menuItem;
        menuItemEl.addEventListener('click', function () {
            self.sendNotification(new Notification(this.menuItem.notificationType, this.menuItem));
        });
        menuEl.appendChild(menuItemEl);
    }
};

/**
 * Создание пункта меню панели навигации.
 * @param menuItem Конфигурация пункта меню.
 * @return menuItemEl DOM-элемент пункта меню.
 */
JournalView.prototype.createMenuItemElement = function (menuItem) {
	var menuItemHtml = '<a href="#' + menuItem.command + '">' + menuItem.label + '</a>';
    var menuItemEl = document.createElement('div');
    menuItemEl.className = 'menuItem';
    menuItemEl.innerHTML = menuItemHtml;
	return menuItemEl;
};
