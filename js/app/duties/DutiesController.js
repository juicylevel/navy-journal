function DutiesController () {
    ViewController.apply(this, arguments);
};

extend(DutiesController, ViewController);

DutiesController.prototype.init = function () {
    window.addEventListener('changeactiveduty', this.onChangeActiveDuty.bind(this));
};

DutiesController.prototype.onUpdateDutiesList = function (options) {
	this.service.getDutyList(options).then((function (response) {
        this.view.setDutyList(response);
    }).bind(this));
};

DutiesController.prototype.onChangeActiveDuty = function (event) {
    this.view.updateDutiesList();
};

DutiesController.prototype.onEditDuty = function (event) {
    var dutyId = event.detail.id;
    setHash('duty/' + dutyId);
};

DutiesController.prototype.onRemoveDuty = function (event) {
    var dutyId = event.detail.id;
};
