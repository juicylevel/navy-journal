/**
 * Макет пользовательского интерфейса журнала.
 */
function JournalLayout () {
	window.addEventListener('resize', (function (event) {
		this.calculate();
	}).bind(this), true);

	this.calculate();
};

/**
 * Вычисление размеров компонентов макета пользовательского интерфейса.
 */
JournalLayout.prototype.calculate = function () {
	var layoutBody = document.getElementById('layoutBody');
	var header = document.getElementById('header');
	var navPanel = document.getElementById('navigationPanel');
	var navContent = document.getElementById('navigation');

	var bodyVGap = this.getElementVGap(layoutBody);
	var headerVGap = this.getElementVGap(header);
	var navPanelVGap = this.getElementVGap(navPanel);
	var navContentVGap = this.getElementVGap(navContent);

	var headerHeight = this.getElementHeight(header);

	var navContentHeight = this.getElementHeight(navContent);
	var navContentFullHeight = navContentHeight +
		headerHeight + navContentVGap + navPanelVGap + bodyVGap + headerVGap;

	var navVGap = bodyVGap + navPanelVGap + headerVGap + headerHeight;

	var windowInnerHeight = window.innerHeight;

	if (navContentFullHeight >= windowInnerHeight) {
		navPanel.style.height = navContentHeight + navContentVGap + 'px';
	}
	else {
		navPanel.style.height = windowInnerHeight - navVGap + 'px';
	}
};

/**
 * // TODO: use getBounds in baseUtils.js
 * Получение высоты элемента.
 */
JournalLayout.prototype.getElementHeight = function (element) {
	var elementStyle = document.defaultView.getComputedStyle(element, null);
	var elementHeight = parseInt(elementStyle.height);
	return elementHeight;
};

/**
 * Получение вертикальных отступов элемента.
 */
JournalLayout.prototype.getElementVGap = function (element) {
	var elementStyle = document.defaultView.getComputedStyle(element, null);

	return parseInt(elementStyle.marginTop) +
	       parseInt(elementStyle.marginBottom) +
		   parseInt(elementStyle.borderTopWidth) +
		   parseInt(elementStyle.borderBottomWidth) +
		   parseInt(elementStyle.paddingTop) +
		   parseInt(elementStyle.paddingBottom);
};
