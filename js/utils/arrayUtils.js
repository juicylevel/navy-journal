/**
 * Поиск элемента по значению.
 * @param array Массив элементов.
 * @param value Значение элемента.
 */
function getElement (array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			return array[i];
		}
	}
}

/**
 * Получение объекта из списка по значению свойства.
 * @param fieldName Наименование свойства.
 * @param fieldValue Искомое значение свойства.
 * @param array Список объектов.
 * @return object
 */
function getElementByFieldValue (fieldName, fieldValue, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][fieldName] === fieldValue) {
			return array[i];
		}
	}
}