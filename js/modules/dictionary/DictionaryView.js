/**
 * Представление модуля управления данными.
 */
function DictionaryView () {
    ModuleView.apply(this, arguments);

    this.moduleTitle = 'Управление данными';
};

extend(DictionaryView, ModuleView);
