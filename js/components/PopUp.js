/**
 * Компонент для показа всплывающих элементов (окон, подсказок и т.д.).
 */
var PopUp = (function (window, document) {

    // Экземпляр класса.
	var instance;

	/**
	 * Конструктор.
	 */
	function PopUp () {
		if (!(this instanceof PopUp)) {
			return new PopUp();
		}
	};

    /**
     * Интерфейс компонента.
     */
	PopUp.prototype = {
        /**
         * Инициализация.
         */
        init: function () {
            this.rootDomElement = document.getElementById('popup');
        },

        /**
         * Показ popUp-а.
         * @param popUpEl DOM-элемент содержимого popUp-а.
         */
        show: function (popUpEl) {
            if (this.rootDomElement.getElementsByClassName('tint').length < 1) {
                this.addTint();
            }

			popUpEl.setAttribute('popUpElement', '');

			popUpEl.addEventListener(EventTypes.CLOSE, (function (event) {
				this.removePopUp(popUpEl);
			}).bind(this));

            this.rootDomElement.appendChild(popUpEl);
            this.toCenter(popUpEl);

            return popUpEl;
        },

        /**
         * Добавление полупрозрачного фона под popup-ом.
         */
        addTint: function () {
            this.rootDomElement.style.right = '0px';
            this.rootDomElement.style.bottom = '0px';

            var tintEl = document.createElement('div');
            tintEl.className = 'tint';
            this.rootDomElement.appendChild(tintEl);

			var contentEl = document.getElementById('content');
			contentEl.classList.add('blur');
        },

        /**
         * Удаление полупрозрачного фона под popup-ом.
         */
        removeTint: function () {
            var tintEl = this.rootDomElement.getElementsByClassName('tint')[0];
            if (!isEmpty(tintEl)) {
                this.rootDomElement.removeChild(tintEl);
                this.rootDomElement.style.right = '';
                this.rootDomElement.style.bottom = '';

				var contentEl = document.getElementById('content');
				contentEl.classList.remove('blur');
            }
        },

        /**
         * Центрирование popup-а.
         * @param popUpEl DOM-элемент содержимого.
         */
        toCenter: function (popUpEl) {
            var bounds = getBounds(popUpEl);

            var x = (window.innerWidth - bounds.width) / 2;
            var y = (window.innerHeight - bounds.height) / 2;

            popUpEl.style.left = ((x * 100) / window.innerWidth) + '%';
            popUpEl.style.top = ((y * 100) / window.innerHeight) + '%';
        },

        /**
         * Удаление popUp-элемента.
         * @param popUpEl DOM-элемент содержимого.
         */
        removePopUp: function (popUpEl) {
            this.rootDomElement.removeChild(popUpEl);

            /*if (this.rootDomElement.getElementsByClassName('popUpBody').length < 1) {
                this.removeTint();
            }*/

			if (getEl(this.rootDomElement, 'popUpElement', null, true).length < 1) {
				this.removeTint();
			}
        }
	};

	/**
	 * @{singleton interface}
	 */
	return {
		/**
		 * Инициализация.
		 */
		init: function () {
			if (!instance) {
				return instance = PopUp.apply(null, arguments);
			}
			return instance;
		},

		/**
		 * Получение экземпляра.
		 */
		getInstance: function () {
			if (!instance) {
				return this.init.apply(this, arguments);
			}
			return instance;
		}
	};
})(window, document);
