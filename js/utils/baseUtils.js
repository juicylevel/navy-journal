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
 * Получение DOM-элементов по значению атрибута.
 * @param context Элемент, в который вложен целевой с наименованием атрибута attributeName.
 * @param attributeName Наименование атрибута искомого элемента.
 * @param attributeValue Значение атрибута attributeName (необязательный).
 * @param all Если true - функция вернёт все элементы с атрибутом attributeName
 * (у которого значение attributeValue, если указано). По умолчанию возвращает первый элемент.
 */
function getEl (context, attributeName, attributeValue, all) {
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

/**
 * Получение строки даты в формате d.m.Y H:i
 * @param date Объект Date или timestamp.
 */
function getDateString (date) {
	if (isEmpty(date)) return '-';

	if (typeof date === 'number') {
		date = new Date(date * 1000);
	}

	var day     = formatDoubleDigit(date.getDate());
	var month   = formatDoubleDigit(date.getMonth() + 1);
	var year    = date.getFullYear();
	var hours   = formatDoubleDigit(date.getHours());
	var minutes = formatDoubleDigit(date.getMinutes());

	return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
};

/**
 * Получение строки времени длительности (H.m.i).
 * @param time Длительность в секундах.
 */
function getDurationString (time) {
	if (isEmpty(time)) return '-';

	var totalSeconds = time;

	var hours     = formatDoubleDigit(Math.floor(totalSeconds / 3600));
	totalSeconds %= 3600;
	var minutes   = formatDoubleDigit(Math.floor(totalSeconds / 60));
	var seconds   = formatDoubleDigit(totalSeconds % 60);

	return hours + ':' + minutes + ':' + seconds;
};

/**
 * Форматирование двузначного числового значения.
 */
function formatDoubleDigit (number) {
	return number < 10 ? '0' + number : number;
};
