/**
 * Модель журнала.
 */
function JournalModel () {
    Model.apply(this, arguments);

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
            label: 'Журнал дежурств',
            icon: 'img/',
            command: SHOW_JOURNAL
        },
        {
            label: 'Статистика',
            icon: 'img/',
            command: null
        },
        {
            label: 'Управление данными',
            icon: 'img/',
            command: null
        }
    ];

    return menu;
};

/**
 * Получение меню для текущего контекста.
 */
JournalModel.prototype.createCurrentMenu = function (moduleMenu) {
    var menu = clone(moduleMenu);

    // нет активного дежурства, отображаем кнопку запуска боевого дежурства
    if (isEmpty(this.activeDutyInfo)) {
        menu.unshift(
            {
                label: 'Начать дежурство',
                icon: 'img/',
                command: START_DUTY,
                system: true
            }
        );
    }
    // есть активное дежурство, но подготовка не завершена, отображаем
    // кнопку завершения подготовки к боевому дежурству
    else if (this.activeDutyInfo.runUp) {
        menu.unshift(
            {
                label: 'Завершить подготовку',
                icon: 'img/',
                command: COMPLETE_RUN_UP,
                system: true
            }
        );
    }
    // есть активное дежурство, подготовка к дежурству завершена, отображаем
    // кнопку завершения боевого дежурства
    else {
        menu.unshift(
            {
                label: 'Завершить дежурство',
                icon: 'img/',
                command: COMPLETE_DUTY,
                system: true
            }
        );
    }

    this.sendNotification(new Notification(CHANGE_JOURNAL_MENU, menu));
};

/**
 * Установка статуса журнала.
 */
JournalModel.prototype.setJournalStatus = function (journalStatus) {
    this.lastDutyInfo = journalStatus.lastDuty;
    this.sendNotification(new Notification(CHANGE_LAST_DUTY_INFO, this.lastDutyInfo));

    if (!isEmpty(journalStatus.activeDuty)) {
        var activeDuty = journalStatus.activeDuty;
        var runUpTime = activeDuty.runUpTime;
        var duration = Math.floor(new Date().getTime() / 1000) - activeDuty.date;

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
    }

    this.sendNotification(new Notification(CHANGE_ACTIVE_DUTY_INFO, this.activeDutyInfo));
};
