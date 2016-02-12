/**
 * Модель журнала.
 */
function JournalModel () {
    Model.apply(this, arguments);

    this.startDutyMenuItem = {
        label: 'Начать дежурство',
        icon: 'img/',
        notificationType: CALL_START_DUTY
    };

    this.completeRunUpMenuItem = {
        label: 'Завершить подготовку',
        icon: 'img/',
        notificationType: CALL_COMPLETE_RUN_UP
    };

    this.completeDutyMenuItem = {
        label: 'Завершить дежурство',
        icon: 'img/',
        notificationType: CALL_COMPLETE_DUTY
    };

    this.goToIndexMenuItem = {
        label: 'На главную',
        icon: 'img/',
        notificationType: CALL_INDEX_MODULE
    };

    this.lastDutyInfo = null;
    this.activeDutyInfo = null;

    this.currentModule = null;
};

extend(JournalModel, Model);

/**
 * Установка статуса журнала.
 * @param journalStatus Информация о статусе журнала
 * (последнее завершённое и активное дежурство).
 */
JournalModel.prototype.setJournalStatus = function (journalStatus) {
    this.setLastDuty(journalStatus.lastDuty);
    this.setActiveDuty(journalStatus.activeDuty);
};

/**
 * Установка последнего завершённого дежурства.
 * @param activeDuty Информация о последнем завершённом дежурстве.
 */
JournalModel.prototype.setLastDuty = function (lastDuty) {
    this.lastDutyInfo = lastDuty;
    this.sendNotification(new Notification(CHANGE_LAST_DUTY_INFO, this.lastDutyInfo));
}

/**
 * Установка активного (текущего) дежурства.
 * @param activeDuty Информация об активном (текущем) дежурстве.
 */
JournalModel.prototype.setActiveDuty = function (activeDuty) {
    if (!isEmpty(activeDuty)) {
        var runUpTime = activeDuty.runUpTime;
        var duration = activeDuty.duration;

        this.activeDutyInfo = {
            date: activeDuty.date,
            duration: duration,
            runUpTime: runUpTime,
            runUp: false
        };

        // если runUpTime = 0, значит подготовка не завершена,
        // необходимо обновлять таймер
        if (runUpTime == 0) {
            this.activeDutyInfo.runUp = true;
            this.activeDutyInfo.runUpTime = duration;
        }
    } else {
        this.activeDutyInfo = null;
    }

    this.sendNotification(new Notification(CHANGE_ACTIVE_DUTY_INFO, this.activeDutyInfo));
};

/**
 * Обновление системного меню.
 */
JournalModel.prototype.updateSystemMenu = function () {
    var systemMenu = [];

    // нет активного дежурства, отображаем кнопку запуска боевого дежурства
    if (isEmpty(this.activeDutyInfo)) {
        systemMenu.unshift(this.startDutyMenuItem);
    }
    // есть активное дежурство, но подготовка не завершена, отображаем
    // кнопку завершения подготовки к боевому дежурству и
    // кнопку завершения боевого дежурства
    else if (this.activeDutyInfo.runUp) {
        systemMenu.unshift(this.completeRunUpMenuItem, this.completeDutyMenuItem);
    }
    // есть активное дежурство, подготовка к дежурству завершена, отображаем
    // кнопку завершения боевого дежурства
    else {
        systemMenu.unshift(this.completeDutyMenuItem);
    }

    if (!isEmpty(this.currentModule) && this.currentModule.name != INDEX) {
        systemMenu.push(this.goToIndexMenuItem);
    }

    this.sendNotification(new Notification(CHANGE_SYSTEM_MENU, systemMenu));
};

/**
 * Установка текущего модуля.
 * @param module Экземпляр класса Module.
 */
JournalModel.prototype.setModule = function (module) {
    this.currentModule = module;

    var moduleMenu = this.currentModule.getMenu();
    var moduleDomElement = this.currentModule.getDomElement();

    this.sendNotification(new Notification(CHANGE_MODULE, {
        menu: moduleMenu, domElement: moduleDomElement
    }));

    this.updateSystemMenu();
};
