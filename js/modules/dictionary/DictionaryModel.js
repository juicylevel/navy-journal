/**
 * Модель модуля управления справочными данными.
 */
function DictionaryModel () {
    Model.apply(this, arguments);

    this.provisionsItems = null;
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
