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

    this.lastDutyInfo = null;
    this.activeDutyInfo = null;
};

extend(JournalModel, Model);

/**
 * Получение меню модуля.
 */
JournalModel.prototype.getModuleMenu = function () {
    var menu = [
        {
            label: 'Боевые дежурства',
            icon: 'img/',
            notificationType: CALL_DUTY_MODULE
        },
        {
            label: 'Статистика',
            icon: 'img/',
            notificationType: CALL_STATISTICS_MODULE
        },
        {
            label: 'Управление данными',
            icon: 'img/',
            notificationType: CALL_DATA_MANAGEMENT_MODULE
        }
    ];

    return menu;
};

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

    this.sendNotification(new Notification(CHANGE_SYSTEM_MENU, systemMenu));
};

/**
 * Получение меню для текущего контекста.
 */
JournalModel.prototype.setCurrentModuleMenu = function (moduleMenu) {
    this.sendNotification(new Notification(CHANGE_MODULE_MENU, moduleMenu));
};
