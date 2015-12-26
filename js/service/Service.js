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
	this.sendRequest('GET', LOAD_CONFIG_COMPLETE, {request: 'loadFile', url: url});
};

/**
 * Получение статуса журнала.
 */
Service.prototype.getJournalStatus = function () {
	// var active = false;
	// var journalStatus;
	//
	// if (active) {
	// 	journalStatus = {
	// 		activeDuty: {
	// 			startDate: '15.11.2015 10:30'
	// 		},
	// 		lastDuty: {
	// 			date: '08.11.2015',
	// 			duration: '06:25'
	// 		}
	// 	};
	// } else {
	// 	journalStatus = {
	// 		activeDuty: null,
	// 		lastDuty: {
	// 			date: '08.11.2015',
	// 			duration: '06:25'
	// 		}
	// 	};
	// }

	// this.sendNotification(new Notification(LOAD_JOURNAL_STATUS, journalStatus));

	this.sendRequest('GET', LOAD_JOURNAL_STATUS, {request: 'getJournalStatus'})
};

/**
 * Создание боевого дежурства.
 */
Service.prototype.createDuty = function () {
	this.sendRequest('POST', CREATE_DUTY_COMPLETE, {request: 'createDuty'});
};

/**
 * Загрузка данных таблицы журнала.
 */
Service.prototype.getJournalTable = function (parameters) {
	// var offset = parameters.offset;
	// var pageSize = parameters.pageSize;
	// var includeColumns = parameters.includeColumns;
	//
	// var gridData = null;
	//
	// if (includeColumns) {
	// 	gridData = {
	// 		columns: JOURNAL_GRID_DATA.columns,
	// 		rows: []
	// 	};
	// }
	// else {
	// 	gridData = {
	// 		rows: []
	// 	};
	// }
	//
	// gridData.rows = JOURNAL_GRID_DATA.rows.slice(offset, offset + pageSize);
	//
	// var self = this;
	// setTimeout(function () {
	// 	self.sendNotification(new Notification(LOAD_JOURNAL_GRID_DATA, gridData));
	// }, 500);
}

/**
 * Отправка запроса на сервер.
 */
Service.prototype.sendRequest = function (method, notification, parameters) {
	if (isEmpty(url)) {
		url = Settings.getInstance().config.serviceUrl;
	}

	var url, request, sendData = null;

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
    		var response = JSON.parse(this.responseText);
			if (!isEmpty(response.result)) {
				self.sendNotification(new Notification(this.notification, response.result));
			} else if (parameters.request == 'loadFile') {
				self.sendNotification(new Notification(this.notification, response));
			} else {
				// TODO: show error message by journal ui
				alert(response.error);
			}
    	}
	}
	xhr.open(method, url, true);

	if (method == 'POST') {
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	}

	xhr.send(sendData);
}
