/**
 * Наследование.
 * Вызов конструктора предка Parent.apply(this, arguments);
 * Вызов метода предка Parent.prototype.method.apply(this, arguments);
 */
function extend (Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
};

/**
 * Проверка на пустое значение.
 */
function isEmpty (value, allowEmptyString) {
	return (value == null) ||
	       (!allowEmptyString ? value === '' : false) ||
	       (Array.isArray(value) && value.length === 0);
};

/**
 * Перевод первого символа строки в верхний регистр.
 */
function capitalize (value) {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Преобразование объекта в url-строку.
 */
function createUrl (parameters) {
	return Object.keys(parameters).map(function (key) {
    	return encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]);
	}).join('&');
};

/**
 * Получение элементов по значению атрибута.
 */
function getElementsByAttribute (context, attributeName, attributeValue, all) {
	var selector = !isEmpty(attributeValue) ?
		'[' + attributeName + '=' + attributeValue + ']' :
		'[' + attributeName + ']';

	if (isEmpty(context)) {
		context = document;
	}

	var elements = context.querySelectorAll(selector);
	var result = null;

	if (!isEmpty(elements)) {
		if (all) {
			result = elements;
		} else {
			result = elements[0];
		}
	}

	return result;
};

/**
 * Удаление дочерних элементов из указанного элемента node.
 */
function removeChilds (node) {
	var last;
	while (last = node.lastChild) {
		node.removeChild(last);
	}
};
