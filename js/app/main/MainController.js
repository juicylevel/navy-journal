function MainController () {
    ViewController.apply(this, arguments);
};

extend(MainController, ViewController);

MainController.prototype.init = function () {
    var me = this;

    this.service.getJournalStatus().then(function (response) {
        me.view.setLastDuty(response.lastDuty);
        me.view.setActiveDuty(response.activeDuty);
        me.view.setBrowser(new Browser());
    });
};

MainController.prototype.onStartDuty = function () {
    var me = this;
    this.service.createDuty().then(function (response) {
        me.view.setActiveDuty(response);
        dispatchGlobalEvent('changeactiveduty');
    });
};

MainController.prototype.onCompleteRunUp = function () {
    var me = this;
    Dialog.getInstance().show('Завершение подготовки к дежурству',
		Settings.getInstance().getCompleteRunUpDialog(),
		[{btn: 'Да'}, {btn: 'Нет'}],
		(function (btn) {
			if (btn == 'Да') {
				me.service.completeRunUp().then(function (response) {
                    me.view.setActiveDuty(response);
                    dispatchGlobalEvent('changeactiveduty');
                });
			}
		}).bind(this)
	);
};

MainController.prototype.onCompleteDuty = function () {
    var me = this;
    Dialog.getInstance().show('Завершение дежурства',
		Settings.getInstance().getCompleteDutyDialog(),
		[{btn: 'Да'}, {btn: 'Нет'}],
		(function (btn) {
			if (btn == 'Да') {
				me.service.completeDuty().then(function (response) {
                    me.view.setLastDuty(response.lastDuty);
                    me.view.setActiveDuty(response.activeDuty);
                    dispatchGlobalEvent('changeactiveduty');
                });
			}
		}).bind(this)
	);
};
