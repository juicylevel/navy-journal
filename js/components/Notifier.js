/**
 * Компонент для отображения оповещений пользователю.
 * @{singleton class}
 */
var Notifier = (function (document) {

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
         * Инициализация.
         */
        init: function () {
            this.rootDomElement = document.getElementById('notifications');
        },

        /**
         * Показ сообщения об ошибке.
         * @param message Теекст сообщения.
         * @param details Дополнительная информация.
         */
        showError: function (message, details) {
			var notificationItem = this.createNotificationItem('error', message, details);
			this.rootDomElement.appendChild(notificationItem);
        },

		/**
		 * Создание элемента оповещения.
		 * @param className Класс CSS.
		 * @param message Теекст сообщения.
         * @param details Дополнительная информация.
		 */
		createNotificationItem: function (className, message, details) {
			var itemEl = document.createElement('div');
            itemEl.className = className;

			var itemHtml = '' +
				'<div message-container class="messageContainer">' +
					'<div message-text>' + message + '</div>' +
				'</div>'+
				'<div close-button class="closeButton"></div>'+
				'<div class="clearBoth"></div>';

			itemEl.innerHTML = itemHtml;

			if (!isEmpty(details)) {
				var detailsEl = this.createDetails(details);
				var messageTextEl = getElementsByAttribute(itemEl, 'message-text');
				messageTextEl.parentNode.insertBefore(detailsEl, messageTextEl.nextSibling);
			}

			var closeEl = getElementsByAttribute(itemEl, 'close-button');
			closeEl.addEventListener('click', (function () {
				this.rootDomElement.removeChild(itemEl);
			}).bind(this));

            return itemEl;
		},

		/**
		 * Создание элемента с дополнительной информацией.
		 * @param details Текст дополнительной информации.
		 */
		createDetails: function (details) {
			var detailsEl = document.createElement('div');
			var detailsHtml = '' +
				'<div details-button class="showDetailsButton">подробнее</div>' +
				'<div details-text style="display: none;">' + details + '</div>';

			detailsEl.innerHTML = detailsHtml;

			var detailsButtonEl = getElementsByAttribute(detailsEl, 'details-button');
			detailsButtonEl.addEventListener('click', function () {
				var detailsTextEl = getElementsByAttribute(detailsEl, 'details-text');
				if (detailsTextEl.style.display == 'none') {
					detailsTextEl.style.display = 'block';
					detailsButtonEl.innerHTML = 'скрыть';
				} else {
					detailsTextEl.style.display = 'none';
					detailsButtonEl.innerHTML = 'подробнее';
				}
			});

			return detailsEl;
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
})(document);
