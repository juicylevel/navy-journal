/**
 * Базовый класс представления.
 * Принимает опопвещения для обновления состояния пользовательского интерфейса,
 * отображаемых данных. Отправляет оповещения о событиях пользовательского
 * интерфейса.
 */
function View (domElement) {
	Receiver.apply(this, arguments);

	this.domElement = domElement;
	this.children = [];
};

extend(View, Receiver);

/**
 * Отрисовка компонента.
 */
View.prototype.render = function () {

};
