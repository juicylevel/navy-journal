/**
 * Базовый класс представления.
 * Отвечает за отображение данных пользователю, предоставляет пользовательский для управления данными.
 * Выполняет роль посредника между компонентами системы и компонентами пользовательского интерфейса.
 * Принимает опопвещения для обновления состояния пользовательского интерфейса, отображаемых данных.
 * Отправляет оповещения о событиях пользовательского интерфейса.
 */
function View (domElement) {
	Receiver.apply(this, arguments);

	this.domElement = domElement;
	this.children = [];
};

extend(View, Receiver);

/**
 * @public
 * Отрисовка компонента.
 */
View.prototype.render = function () {

};

/**
 * @public
 * Добавление потомка.
 * @param view Потомок.
 */
View.prototype.add = function (child) {
	if (child instanceof View) {
		var childDOMElement = child.render();
		this.addChildDOMElement(childDOMElement);
		this.children.push(child);
	}
};

/**
 * @protected
 * Добавление DOM элемента потомка.
 * @param childDOMElement DOM элемента потомка.
 */
View.prototype.addChildDOMElement = function (childDOMElement) {
	this.domElement.appendChild(childDOMElement);
};
