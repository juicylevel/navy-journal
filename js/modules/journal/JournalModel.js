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
