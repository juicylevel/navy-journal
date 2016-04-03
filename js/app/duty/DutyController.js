function DutyController () {
    ViewController.apply(this, arguments);
};

extend(DutyController, ViewController);

DutyController.prototype.init = function () {
    console.log('dutyId', this.view.dutyId);
};
