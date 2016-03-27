/**
 * Компонент для отображаения диалоговых окон.
 * @{singleton class}
 */
var Dialog = (function () {

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
         * Показ окна подтверждения.
		 * @param title Заголовок сообщения.
         * @param message Текст сообщения.
         * @param buttons Объект настроек блока с кнопками и их обработчиками.
		 * @param handler
         */
        show: function (title, message, buttons, handler) {
            var messageEl = document.createElement('p');
			messageEl.innerHTML = message;

			var window = new Window(title, messageEl, buttons, handler);

            PopUp.getInstance().show(window.el);
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
})();
