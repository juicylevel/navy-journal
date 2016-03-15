/**
 * Модель модуля управления справочными данными.
 */
function DictionaryModel () {
    Model.apply(this, arguments);

    this.provisionsItems = null;
    this.provisionsTypes = null;
};

extend(DictionaryModel, Model);

/**
 * Установка списка элементов провизии.
 * @param provisionsItems Типы провизии.
 */
DictionaryModel.prototype.setProvisionsItems = function (provisionsItems) {
    this.provisionsItems = provisionsItems;
    this.sendNotification(new Notification(Notifications.CHANGE_PROVISIONS_ITEMS, this.provisionsItems));
};

/**
 * Установка списка типов провизии.
 * @param provisionsTypes Типы провизии.
 */
DictionaryModel.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.provisionsTypes = provisionsTypes;
    this.sendNotification(new Notification(Notifications.CHANGE_PROVISIONS_TYPES, this.provisionsTypes));
};
