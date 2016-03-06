/**
 * Представление модуля управления данными.
 */
function DictionaryView () {
    ModuleView.apply(this, arguments);

    this.moduleTitle = 'Управление данными';
};

extend(DictionaryView, ModuleView);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
DictionaryView.prototype.getHandlers = function () {
	return [
        {type: Notifications.CHANGE_PROVISIONS_ITEMS, handler: this.onChangeProvisionsItems}
	];
};

/**
 * Отрисовка представления модуля.
 */
DictionaryView.prototype.render = function () {
    ModuleView.prototype.render.apply(this, arguments);
    this.showFrame(Consts.PROVISIONS);
},

/**
 * Создание фрейма с таблицей боевых дежурств.
 * @return DOM-элемент фрейма.
 */
DictionaryView.prototype.createProvisionsFrame = function () {
    var dutyListFrame = new ProvisionsFrame(this);
    return dutyListFrame;
};

/**
 * Обработка оповещения об изменении списка элементов провизии.
 * @param provisionsItems Типы провизии.
 */
DictionaryView.prototype.onChangeProvisionsItems = function (provisionsItems) {
    var provisionsFrame = this.getFrame(Consts.PROVISIONS);
    provisionsFrame.setProvisionsItems(provisionsItems);
};
