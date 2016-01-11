/**
 * Менеджер модулей.
 * @{singleton class}
 */
var ModuleManager = (function () {

	// Экземпляр класса.
	var instance;

	/**
	 * Конструктор.
	 */
	function ModuleManager () {
		if (!(this instanceof ModuleManager)) {
			return new ModuleManager();
		}

        this.moduleMap = {};
	};

    /**
     * Интерфейс менеджера модулей.
     */
	ModuleManager.prototype = {
        /**
         * Получение модуля по наименованию.
         * @param moduleName Наименование модуля.
         */
        getModule: function (moduleName) {
            var module = null;

            if (isEmpty(this.moduleMap[moduleName])) {
                module = this.create(moduleName);
                if (!isEmpty(module)) {
                    this.moduleMap[moduleName] = module;
                }
            } else {
                module = this.moduleMap[moduleName];
            }

            return module;
        },

        /**
         * Создание модуля по наименованию.
         * @param moduleName Наименование модуля.
         */
        create: function (moduleName) {
            var module = null;

            switch (moduleName) {
                case JOURNAL:
                    module = new Module(JournalModel, JournalView, JournalController);
                    break;
                case STATISTICS:
                case DATA_MANAGEMENT:
                default:
                    Notifier.getInstance().showError(
                        'Ошибка при создании модуля',
                        'Модуль с наименованием "' + moduleName + '" в системе не зарегистрирован'
                    );
            }

            return module;
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
				return instance = ModuleManager.apply(null, arguments);
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
