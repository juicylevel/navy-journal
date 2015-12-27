/**
 * Компонент для отображения оповещений пользователю.
 * @{singleton class}
 */
var Notifier = (function () {

	// Экземпляр класса.
	var instance;

	/**
	 * Конструктор.
	 */
	function Notifier () {
		if (!(this instanceof Notifier)) {
			return new Notifier();
		}
	};

    /**
     * Интерфейс компонента.
     */
	Notifier.prototype = {
        /**
         * Показ сообщения об ошибке.
         * @param message Теекст сообщения.
         * @param details Дополнительная информация.
         */
        showError: function (message, details) {

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
				return instance = Notifier.apply(null, arguments);
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
