function View (controllerClass) {
    this.el = null;
    this.controllerClass = controllerClass;
    this.controller = null;

    this.render();
    this.createController();
    this.init();
};

View.prototype.render = function () {
    this.el = document.createElement('div');
};

View.prototype.getEl = function (attributeName, attributeValue, all) {
    return getEl(this.el, attributeName, attributeValue, all);
};

View.prototype.createController = function () {
    this.controller = new this.controllerClass(this);
};

View.prototype.init = function () {

};

// TODO: перенести в виджеты
View.prototype.listen = function (eventType, el, handler, params) {
    el.addEventListener(eventType, (function (event) {
        var context = !isEmpty(this[handler]) ? this : this.controller;
        context[handler].call(context, event, params);
    }).bind(this));
};
