/**
 * Базовый класс виджета.
 */
function Widget () {
    this.el = null;
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

/**
 * Данные виджета.
 * @param data Данные.
 */
Widget.prototype.setData = function (data) {

};

/**
 * Изменение видимости виджета.
 * @param visible Флаг видимости.
 */
Widget.prototype.setVisible = function (visible) {
    var display = visible ? 'block' : 'none';
    this.el.style.display = display;
};
