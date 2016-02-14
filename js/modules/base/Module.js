/**
 * Базовый класс модуля приложения.
 * @param name Наименование модуля.
 * @param modelClass Класс модели.
 * @param viewClass Класс представления.
 * @param controllerClass Класс контроллера.
 */
function Module (name, modelClass, viewClass, controllerClass) {
    this.name = name;
    this.model = new modelClass();
    this.view = new viewClass();
    this.service = new Service();
    this.controller = new controllerClass(this.model, this.view, this.service);

    this.mapComponents();
};

/**
 * Создание связей между компонентами.
 */
Module.prototype.mapComponents = function () {
    this.model.addReceiver(this.view);
    this.model.addReceiver(this.controller);
    this.view.addReceiver(this.controller);
    this.service.addReceiver(this.controller);

    Bus.getInstance().addReceiver(this.controller);
};

/**
 * Получение DOM-элемента представления модуля.
 * @return DOM-элемент модуля.
 */
Module.prototype.getDomElement = function () {
    if (isEmpty(this.view.domElement)) {
        this.view.render();
    }
    return this.view.domElement;
};

/**
 * Получение списка пунктов меню модуля.
 * @return Список пунктов меню.
 */
Module.prototype.getMenu = function () {
    return NAVIGATION[this.name];
}
