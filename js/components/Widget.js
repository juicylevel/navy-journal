/**
 * Базовый класс виджета.
 */
function Widget () {
    this.domElement = null;
    this.render();
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
