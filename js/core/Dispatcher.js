/**
 * Класс рассылающий оповещения обозревателям об изменениях.
 */
function Dispatcher () {
	this.receiversMap = {};
}

/**
 * Добавление приёмника уведомлений.
 * @param receiver Приёмник.
 */
Dispatcher.prototype.addReceiver = function (receiver) {
	if (receiver instanceof Receiver) {
		var receiverHandlers = receiver.getHandlers();
		if (!isEmpty(receiverHandlers)) {
			for (var i in receiverHandlers) {
				var receiverHandlerConfig = receiverHandlers[i];
				this.addReceiverToMap(receiverHandlerConfig, receiver);
			}
		}
	}
}

/**
 * @private
 * Добавление приёмника в map-объект.
 * @param receiverHandlerConfig Конфигурация оповещения (тип и обработчик).
 * @param receiver Приёмник оповещений.
 */
Dispatcher.prototype.addReceiverToMap = function (receiverHandlerConfig, receiver) {
	var notificationType = receiverHandlerConfig.type;
	var notificationHandler = receiverHandlerConfig.handler;

	if (!(notificationType in this.receiversMap)) {
		this.receiversMap[notificationType] = [];
	}

	var receiversMapItem = getElementByFieldValue('receiver', receiver, this.receiversMap[notificationType]);
	if (isEmpty(receiversMapItem)) {
		this.receiversMap[notificationType].push({receiver: receiver, handler: notificationHandler});
	}
}

/**
 * Удаление приёмника уведомлений.
 * @param receiver Приёмник.
 */
Dispatcher.prototype.removeObserver = function (receiver) {
	// TODO
}

/**
 * Удаление всех приёмников.
 */
Dispatcher.prototype.removeAllReceivers = function () {
	this.receiversMap = {};
}

/**
 * Отправка уведомление приёмникам.
 * @param notification Объект оповещения {type: 'тип события', data: 'данные'}.
 */
Dispatcher.prototype.sendNotification = function (notification) {
	var receiversMapItem = this.receiversMap[notification.type];
	if (!isEmpty(receiversMapItem)) {
		for (var i in receiversMapItem) {
			var notificationConfig = receiversMapItem[i];
			notificationConfig.handler.call(notificationConfig.receiver, notification.data);
		}
	}
}
