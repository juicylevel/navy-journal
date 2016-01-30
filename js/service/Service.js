/**
 * Компонент для взаимодействия с сервером.
 */
function Service () {
	Dispatcher.apply(this, arguments);
};

extend(Service, Dispatcher);

/**
 * Загрузка конфигурации приложения.
 */
Service.prototype.loadConfig = function (url) {
	this.sendRequest('GET', LOAD_CONFIG_COMPLETE, {
		request: 'loadFile',
		url: url,
		message: 'Загрузка файла конфигурации'
	});
};

/**
 * Получение статуса журнала.
 */
Service.prototype.getJournalStatus = function () {
	this.sendRequest('GET', LOAD_JOURNAL_STATUS, {
		request: 'getJournalStatus',
		message: 'Определение статуса журнала'
	});
};

/**
 * Создание боевого дежурства.
 */
Service.prototype.createDuty = function () {
	this.sendRequest('POST', CREATE_DUTY_COMPLETE, {
		request: 'createDuty',
		message: 'Создание боевого дежурства'
	});
};

/**
 * Завершение подготовки к дежурству.
 */
Service.prototype.completeRunUp = function () {
	this.sendRequest('POST', RUN_UP_COMPLETE, {
		request: 'completeRunUp',
		message: 'Завершение подготовки к дежурству'
	});
};

/**
 * Завершение боевого дежурства.
 */
Service.prototype.completeDuty = function () {
	this.sendRequest('POST', DUTY_COMPLETE, {
		request: 'completeDuty',
		message: 'Завершение боевого дежурства'
	});
};

/**
 * Загрузка списка боевых дежурств.
 * @param dutyListOptions
 */
Service.prototype.getDutyList = function (dutyListOptions) {
	var sortJsonString = null;
	var sort = dutyListOptions.sort;
	if (!isEmpty(sort)) {
		sortJsonString = JSON.stringify(sort);
	}

	this.sendRequest('GET', LOAD_DUTY_LIST, {
		request: 'getDutyList',
		offset: dutyListOptions.offset,
		pageSize: dutyListOptions.pageSize,
		sort: sortJsonString,
		message: 'Загрузка списка боевых дежурств'
	});
};

/**
 * Отправка запроса на сервер.
 */
Service.prototype.sendRequest = function (method, notification, parameters) {
	if (isEmpty(url)) {
		url = Settings.getInstance().config.serviceUrl;
	}

	var url, request, message, sendData = null;

	if (!isEmpty(parameters.message)) {
		message = parameters.message;
		delete parameters.message;
	} else {
		message = 'Загрузка данных';
	}

	parameters.time = new Date().getTime();

	if (parameters.request == 'loadFile') {
		url = parameters.url;
	} else {
		url = Settings.getInstance().config.serviceUrl;
		if (method == 'GET') {
			url += '?' + createUrl(parameters);
		} else if (method == 'POST') {
			sendData = JSON.stringify(parameters);
		}
	}

	var self = this;
	var xhr = new XMLHttpRequest();
	xhr.parameters = parameters;
	xhr.notification = notification;

	xhr.onreadystatechange = function() {
		// TODO: handle error response
		if (this.readyState == 4 && this.status == 200) {
			Notifier.getInstance().hideProgress(this.progressEl);

    		var response = JSON.parse(this.responseText);
			if (!isEmpty(response.result)) {
				self.sendNotification(new Notification(this.notification, response.result));
			} else if (parameters.request == 'loadFile') {
				self.sendNotification(new Notification(this.notification, response));
			} else {
				Notifier.getInstance().showError('Произошла ошибка, приносим свои извинения.', response.error);
			}
    	}
	}
	xhr.open(method, url, true);

	if (method == 'POST') {
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	}

	xhr.progressEl = Notifier.getInstance().showProgress(message);

	xhr.send(sendData);
}
