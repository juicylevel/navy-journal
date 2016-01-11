/**
 * Bus реализует связь между модулями приложения.
 * @{singleton class}
 */
var Bus = (function () {

	// Экземпляр класса.
	var instance;

	/**
	 * Конструктор.
	 */
	function Bus () {
		if (!(this instanceof Bus)) {
			return new Bus();
		}

        this.dispatcher = new Dispatcher();
	};

    /**
     * Интерфейс шины.
     */
	Bus.prototype = {
        /**
         * Добавление приёмника уведомлений.
         * @param receiver Приёмник.
         */
        addReceiver: function (receiver) {
            this.dispatcher.addReceiver(receiver);
        },

        /**
         * Отправка уведомление приёмникам.
         * @param notification Объект оповещения {type: 'тип события', data: 'данные'}.
         */
        sendNotification: function (notification) {
            this.dispatcher.sendNotification(notification);
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
				return instance = Bus.apply(null, arguments);
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
