/**
 * Базовый класс модуля приложения.
 */
function Module (modelClass, viewClass, controllerClass) {
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
};
