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
 * Получение значения hash без #.
 */
function getHash () {
	var hash = window.location.hash;
	if (!isEmpty(hash)) {
		return hash.substring(1);
	}
};

/**
 * Установка значения hash.
 */
function setHash (hash) {
	window.location.hash = hash;
};

/**
 * Отправка глобального события.
 * @param eventType Тип события.
 * @param params Параметры (объект).
 */
function dispatchGlobalEvent (eventType, params) {
	var globalEvent = new CustomEvent(eventType, {
		detail: params
	});
	window.dispatchEvent(globalEvent);
};

/**
 * Преобразование объекта в json-строку.
 */
function objectToJsonString (object) {
	var jsonString = null;
	if (!isEmpty(object)) {
		jsonString = JSON.stringify(object);
	}
	return jsonString;
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
 * Удаление элемента/ов по атрибуту.
 * @see getEl function
 */
function removeEl (context, attributeName, attributeValue, all) {
	var elements = getEl(context, attributeName, attributeValue, all);
	if (!isEmpty(elements)) {
		elements = !(elements instanceof NodeList) ? [elements] : elements;
		var length = elements.length,
			removedEl;
		for (var i = 0; i < length; i++) {
			removedEl = elements[i];
		    removedEl.parentNode.removeChild(removedEl);
		}
	}
};

/**
 * Добавление прослушивателя события.
 * @param target Целевой объект, кидающий событие.
 * @param type Тип события.
 * @param handler Обработчик события.
 * @param context Контекст выполнения обработчика события.
 */
function listen (target, type, handler, context) {
	target.addEventListener(type, function (event) {
		if (isEmpty(context)) {
			context = handler;
		}
		handler.call(context, event);
	});
};

/**
 * Клонирование объекта.
 * @param source Целевой объект.
 * @return Object Клон целевого объекта source.
 */
function clone (source) {
	return JSON.parse(JSON.stringify(source));
}

/**
 * Получение строки даты в формате d.m.Y H:i
 * @param date Объект Date или timestamp.
 */
function getDateString (date, withTime) {
	if (isEmpty(date)) return '-';

	if (typeof date === 'number') {
		date = new Date(date * 1000);
	}

	var result;

	var day     = formatDoubleDigit(date.getDate());
	var month   = formatDoubleDigit(date.getMonth() + 1);
	var year    = date.getFullYear();

	result = day + '.' + month + '.' + year;

	if (withTime) {
		var hours   = formatDoubleDigit(date.getHours());
		var minutes = formatDoubleDigit(date.getMinutes());

		result += ' ' + hours + ':' + minutes;
	}

	return result;
};

/**
 * Преобразование строки даты dd.mm.yyyy в timestamp.
 * @param dateString Строка даты dd.mm.yyyy.
 * @return timestamp
 */
function dateStringToTime (dateString) {
	var dateSplited = dateString.split('.');
	var day   = parseInt(dateSplited[0]);
	var mouth = parseInt(dateSplited[1]) - 1;
	var year  = parseInt(dateSplited[2]);//27.03.2016

	var result = null;
	var date = new Date(year, mouth, day);

	if (date != 'Invalid Date') {
		result = date.getTime() / 1000;
	}

	return result;
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

/**
 * // TODO: учесть отступы и рамки.
 * Получение границ элемента.
 * @param element DOM-элемент.
 * @return Object {x: int, y: int, width: int, height: int}
 */
function getBounds (element) {
	var elementStyle = document.defaultView.getComputedStyle(element, null);
	return {
		x: elementStyle.left == 'auto' ? 0 : parseInt(elementStyle.left),
		y: elementStyle.top == 'auto' ? 0 : parseInt(elementStyle.top),
		width: parseInt(elementStyle.width),
		height: parseInt(elementStyle.height)
	};
};
