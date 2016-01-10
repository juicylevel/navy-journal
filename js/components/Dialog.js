/**
 * Компонент для отображаения диалоговых окон.
 * @{singleton class}
 */
var Dialog = (function (window, document) {

	// Экземпляр класса.
	var instance;

	/**
	 * Конструктор.
	 */
	function Dialog () {
		if (!(this instanceof Dialog)) {
			return new Dialog();
		}
	};

    /**
     * Интерфейс компонента.
     */
	Dialog.prototype = {
        /**
         * Инициализация.
         */
        init: function () {
            this.rootDomElement = document.getElementById('popup');
        },

        /**
         * Показ окна подтверждения.
         * @param message Текст сообщения.
         * @param buttons Объект настроек блока с кнопками и их обработчиками.
         * @param title Заголовок сообщения.
         */
        show: function (message, buttons, title) {
            title = isEmpty(title) ? 'Сообщение' : title;

            var dialogBodyEl = this.createDialogBody(message, buttons, title);

            if (this.rootDomElement.getElementsByClassName('tint').length < 1) {
                this.addTint();
            }

            this.rootDomElement.appendChild(dialogBodyEl);
            this.toCenter(dialogBodyEl);
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
         * @param popUpEl DOM-элемент popup-а.
         */
        toCenter: function (popUpEl) {
            var bounds = getBounds(popUpEl);

            var x = (window.innerWidth - bounds.width) / 2;
            var y = (window.innerHeight - bounds.height) / 2;

            popUpEl.style.left = ((x * 100) / window.innerWidth) + '%';
            popUpEl.style.top = ((y * 100) / window.innerHeight) + '%';
        },

        /**
         * Создание контейнера окна сообщения.
         */
        createDialogBody: function (message, buttons, title) {
            var dialogBodyEl = document.createElement('div');
            dialogBodyEl.className = 'dialogBody';

            var dialogBodyHtml = '' +
                '<div class="title">' + title + '</div>' +
                '<div class="message">' + message + '</div>' +
                '<div buttons class="buttons"></div>';

            dialogBodyEl.innerHTML = dialogBodyHtml;

            var self = this,
                buttonsEl = getEl(dialogBodyEl, 'buttons'),
                buttonEl;

            for (var buttonName in buttons) {
                if (buttonName == 'context') continue;

                buttonEl = document.createElement('button');
                buttonEl.innerHTML = buttonName;
                buttonEl.buttonName = buttonName;
                buttonEl.addEventListener('click', function () {
                    var handler = buttons[this.buttonName];
                    if (!isEmpty(handler)) {
                        handler.call(buttons.context);
                    }
                    self.removeDialog(dialogBodyEl);
                });

                buttonsEl.appendChild(buttonEl);
            }

            return dialogBodyEl;
        },

        /**
         * Удаление диалогового окна.
         * @param dialogBodyEl DOM-элемент диалогового окна.
         */
        removeDialog: function (dialogBodyEl) {
            this.rootDomElement.removeChild(dialogBodyEl);

            if (this.rootDomElement.getElementsByClassName('dialogBody').length < 1) {
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
				return instance = Dialog.apply(null, arguments);
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
