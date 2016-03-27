function Service () {};

Service.prototype.loadConfig = function (url) {
	return this.sendRequest('GET', 'Загрузка файла конфигурации', {
		request: 'loadFile',
		url: url
	});
};

Service.prototype.getJournalStatus = function () {
    return this.sendRequest('GET', 'Определение статуса журнала', {
        request: 'getJournalStatus'
    });
};

Service.prototype.createDuty = function () {
	return this.sendRequest('POST', 'Создание боевого дежурства', {
		request: 'createDuty'
	});
};

Service.prototype.completeRunUp = function () {
	return this.sendRequest('POST', 'Завершение подготовки к дежурству', {
		request: 'completeRunUp'
	});
};

Service.prototype.completeDuty = function () {
	return this.sendRequest('POST', 'Завершение боевого дежурства', {
		request: 'completeDuty'
	});
};

Service.prototype.getDutyList = function (options) {
	return this.sendRequest('GET', 'Загрузка списка боевых дежурств', {
		request: 'getDutyList',
		offset: options.offset,
		pageSize: options.pageSize,
		sort: objectToJsonString(options.sort)
	});
};

Service.prototype.getProvisionsData = function (options) {
    return this.sendRequest('GET', 'Загрузка информации об элементах и типах провизии', {
		request: 'getProvisionsData',
		sort: objectToJsonString(options.sort)
	});
};

Service.prototype.getProvisionsItems = function (options) {
    return this.sendRequest('GET', 'Загрузка списка элементов провизии', {
		request: 'getProvisionsItems',
		sort: objectToJsonString(options.sort)
	});
};

Service.prototype.saveProvisionsItem = function (item, sort) {
	return this.sendRequest('POST', 'Сохранение элемента провизии', {
		request: 'saveProvisionsItem',
		item: item,
		sort: sort
	});
};

Service.prototype.getAccumulators = function (options) {
    return this.sendRequest('GET', 'Загрузка списка аккумуляторов', {
		request: 'getAccumulators',
		sort: objectToJsonString(options.sort)
	});
};

Service.prototype.saveAccumulator = function (item, sort) {
	return this.sendRequest('POST', 'Сохранение аккумулятора', {
		request: 'saveAccumulator',
		item: item,
		sort: sort
	});
};

Service.prototype.sendRequest = function (method, message, parameters) {
    return new Promise (function (resolve, reject) {
        var url, request, message, sendData = null;

    	if (isEmpty(message)) message = 'Загрузка данных';

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

    	xhr.onreadystatechange = function() {
    		// TODO: handle error response
    		if (this.readyState == 4 && this.status == 200) {
    			Notifier.getInstance().hideProgress(this.progressEl);

        		var response = JSON.parse(this.responseText);
    			if (!isEmpty(response.result)) {
    				resolve(response.result);
    			} else if (parameters.request == 'loadFile') {
    				resolve(response);
    			} else {
    				Notifier.getInstance().showError('Произошла ошибка, приносим свои извинения.', response.error);
                    reject(response);
    			}
        	}
    	}

    	xhr.open(method, url, true);

    	if (method == 'POST') {
    		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    	}

    	xhr.progressEl = Notifier.getInstance().showProgress(message);

    	xhr.send(sendData);
    });
};
