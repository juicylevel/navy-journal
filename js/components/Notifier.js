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
		 * Показ прогресса выполнения операции.
		 * @param message Текст сообщения (описание операции).
		 */
		showProgress: function (message) {
			var progressEl = document.createElement('div');
			progressEl.setAttribute('progress', null);
			progressEl.className = 'progress';

			var progressHtml = '' +
				'<div message-container class="messageContainer">' +
					'<div message-text>' + message + '</div>' +
					'<div progress-time class="progressTime"></div>' +
				'</div>' +
				'<div class="preloader"></div>' +
				'<div class="clearBoth"></div>';

			progressEl.innerHTML = progressHtml;

			var updateTimer = function () {
				var progressTimeEl = getEl(progressEl, 'progress-time');
				progressTimeEl.innerHTML = 'выполняется: ' + progressEl.progressTime++ + ' сек';
			};

			progressEl.progressTime = 0;
			updateTimer();
			progressEl.progressTimer = setInterval(updateTimer, 1000);

			this.rootDomElement.appendChild(progressEl);
			return progressEl;
		},

		/**
		 * Скрытие прогресса выполнения операции.
		 * @param progressEl DOM-элемент прогресса выполнения операции.
		 */
		hideProgress: function (progressEl) {
			clearInterval(progressEl.progressTimer);
			this.rootDomElement.removeChild(progressEl);
		},

		/**
		 * Показ сообщения об успешном завершении операции.
		 * @param message Теекст сообщения.
		 */
		showSuccess: function (message) {
			var notificationItem = this.createNotificationItem('success', message);
			notificationItem.showTimer = setTimeout((function () {
				this.removeNotificationItem(notificationItem);
			}).bind(this), Settings.getInstance().config.ui.showNotificationTime * 1000);
			this.rootDomElement.appendChild(notificationItem);
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
				var messageTextEl = getEl(itemEl, 'message-text');
				messageTextEl.parentNode.insertBefore(detailsEl, messageTextEl.nextSibling);
			}

			var closeEl = getEl(itemEl, 'close-button');
			closeEl.addEventListener('click', (function () {
				this.removeNotificationItem(itemEl);
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

			var detailsButtonEl = getEl(detailsEl, 'details-button');
			detailsButtonEl.addEventListener('click', function () {
				var detailsTextEl = getEl(detailsEl, 'details-text');
				if (detailsTextEl.style.display == 'none') {
					detailsTextEl.style.display = 'block';
					detailsButtonEl.innerHTML = 'скрыть';
				} else {
					detailsTextEl.style.display = 'none';
					detailsButtonEl.innerHTML = 'подробнее';
				}
			});

			return detailsEl;
		},

		/**
		 * Удаление элемента оповещения.
		 * @param DOM-элемент оповещения.
		 */
		removeNotificationItem: function (itemEl) {
			clearTimeout(itemEl.showTimer);
			this.rootDomElement.removeChild(itemEl);
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
