/**
 * Модуль с со списком боевых дежурств.
 */
function IndexView () {
    ModuleView.apply(this, arguments);

    this.moduleTitle = 'Главная';
};

extend(IndexView, ModuleView);

/**
 * Отрисовка представления модуля.
 */
IndexView.prototype.render = function () {
    ModuleView.prototype.render.apply(this, arguments);
    this.showFrame(DUTY_LIST_FRAME);
};

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
IndexView.prototype.getHandlers = function () {
	return [
        {type: CHANGE_DUTY_LIST, handler: this.onChangeDutyList}
	];
};

/**
 * Создание фрейма с таблицей боевых дежурств.
 * @return DOM-элемент фрейма.
 */
IndexView.prototype.createDutyListFrame = function () {
    var dutyListFrame = new DutyListFrame(this);
    return dutyListFrame;
};

// TODO:
/**
 * Обновление списка боевых дежурств.
 */
IndexView.prototype.refreshDutyList = function () {
    var dutyListFrame = this.getFrame(DUTY_LIST_FRAME);
    dutyListFrame.refreshDutyList();
};

/**
 * Обработка события обновления списка боевых дежурств.
 * @param dutyList Список боевых дежурств.
 */
IndexView.prototype.onChangeDutyList = function (dutyList) {
    var dutyListFrame = this.getFrame(DUTY_LIST_FRAME);
    dutyListFrame.setDutyList(dutyList);
};
