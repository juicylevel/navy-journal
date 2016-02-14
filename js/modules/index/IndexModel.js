/**
 * Модель модуля с таблицей боевых дежурств.
 */
function IndexModel () {
    Model.apply(this, arguments);

    this.dutyList = null;
};

extend(IndexModel, Model);

/**
 * Установка списка боевых дежурств.
 * @param dutyList Список боевых дежурств.
 */
IndexModel.prototype.setDutyList = function (dutyList) {
    this.dutyList = dutyList;
    this.sendNotification(new Notification(Notifications.CHANGE_DUTY_LIST, this.dutyList));
};
