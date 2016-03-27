function AccumulatorsController () {
    ViewController.apply(this, arguments);
};

extend(AccumulatorsController, ViewController);

AccumulatorsController.prototype.onLoadAccumulators = function (options) {
    var me = this;
	options = options || {sort: {name: 'ASC'}};

	this.service.getAccumulators(options).then(function (response) {
        me.view.setAccumulators(response);
    });
};

AccumulatorsController.prototype.onSaveAccumulator = function (item, sort) {
    var me = this;
    this.service.saveAccumulator(item, sort).then(function (response) {
        me.view.setAccumulators(response);
    	me.view.clearAccumulatorForm();
    });
};
