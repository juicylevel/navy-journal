/**
 * Базовый класс виджета.
 */
function Widget () {
    this.domElement = null;
};

/**
 * Получение DOM-элемента виджета.
 */
Widget.prototype.getDomElement = function () {
    return this.domElement;
};

/**
 * Отрисовка виджета.
 */
Widget.prototype.render = function () {

};

/**
 * Инициализация виджета.
 */
Widget.prototype.init = function () {
    
};
