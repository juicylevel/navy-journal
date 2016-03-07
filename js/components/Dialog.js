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
         * @param message Текст сообщения.
         * @param buttons Объект настроек блока с кнопками и их обработчиками.
         * @param title Заголовок сообщения.
         */
        show: function (message, buttons, title) {
            title = isEmpty(title) ? 'Сообщение' : title;

            var messageEl = document.createElement('p');
			messageEl.innerHTML = message;

			var window = new Window(title, messageEl, buttons);

            PopUp.getInstance().show(window.getDomElement());
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
