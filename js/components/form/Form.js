/**
 * Форма.
 */
function Form () {
    Widget.apply(this, arguments);
};

extend(Form, Widget);

/**
 * Отрисовка формы.
 */
Form.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('form', null);

    this.createFields();
};

/**
 * Создание полей ввода.
 */
Form.prototype.createFields = function () {

};
