/**
 * Модель модуля управления справочными данными.
 */
function DictionaryModel () {
    Model.apply(this, arguments);

    this.provisionsTypes = null;
};

extend(DictionaryModel, Model);

/**
 * Установка списка типов провизии.
 * @param provisionsTypes Типы провизии.
 */
DictionaryModel.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.provisionsTypes = provisionsTypes;
    this.sendNotification(new Notification(Notifications.CHANGE_PROVISIONS_TYPES, this.provisionsTypes));
};
