/**
 * Настройки приложения.
 * @{singleton class}
 */
var Settings = (function () {

	// Экземпляр класса настроек приложения.
	var instance;

	/**
	 * Конструктор.
	 */
	function Settings () {
		if (!(this instanceof Settings)) {
			return new Settings();
		}
	};

    /**
     * Настройки приложения (константы и конфигурация).
     */
	Settings.prototype = {
        // константы
        DEFAULT_GRID_PAGE_SIZE: 10,

        // параметры
        config: {}
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
				return instance = Settings.apply(null, arguments);
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
