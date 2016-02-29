/**
 * Представление модуля управления данными.
 */
function DictionaryView () {
    ModuleView.apply(this, arguments);

    this.moduleTitle = 'Управление данными';
};

extend(DictionaryView, ModuleView);

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
