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

		this.config = {};
	};

    /**
     * Настройки приложения (константы и конфигурация).
     */
	Settings.prototype = {
        /**
		 * Получение максимального размера страницы в таблице боевых дежурств.
		 * @return Размер страницы.
		 */
		getDutyListPageSize: function () {
			return this.config.ui.dutyListPageSize;
		},

		/**
		 * Получение колонок таблицы боевых дежурств.
		 * @return {column: label} Список боевых дежкрств.
		 */
		getDutyListColumns: function () {
			return this.config.meta.dutyGridColumns;
		},

		/**
		 * Получение колонок таблицы элементов провизии.
		 * @return {column: label} Список колонок элементов провизии.
		 */
		getProvisionsItemColumns: function () {
			return this.config.meta.provisionsItemColumns;
		},

		/**
		 * Получение колонок таблицы аккумуляторов.
		 * @return {column: label} Список колонок аккумуляторов.
		 */
		getAccumulatorsColumns: function () {
			return this.config.meta.accumulatorsColumns;
		},

		/**
		 * Получение текста диалогового окна завершения подготовки к дежурству.
		 */
		getCompleteRunUpDialog: function () {
			return this.config.dialogs.completeRunUp;
		},

		/**
		 * Получение текста диалогового окна завершения боевого дежурства.
		 */
		getCompleteDutyDialog: function () {
			return this.config.dialogs.completeDuty;
		},

		/**
		 * Получение списка состояний погоды (Облачно, солнечно, дождь..).
		 */
		getWeatherConditions: function () {
			return this.config.meta.weatherConditions;
		},

		/**
		 * Получение списка направлений ветра.
		 */
		getWindDirections: function () {
			return this.config.meta.windDirections;
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
