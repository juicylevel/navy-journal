/**
 * Модель журнала.
 */
function JournalModel () {
    Model.apply(this, arguments);

    this.lastDutyInfo = null;
};

extend(JournalModel, Model);

JournalModel.prototype.setJournalStatus = function (journalStatus) {
    this.lastDutyInfo = journalStatus.lastDuty;
    this.sendNotification(new Notification(CHANGE_LAST_DUTY_INFO, this.lastDutyInfo));
};
