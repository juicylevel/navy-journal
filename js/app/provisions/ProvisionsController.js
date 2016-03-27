function ProvisionsController () {
    ViewController.apply(this, arguments);
};

extend(ProvisionsController, ViewController);

ProvisionsController.prototype.init = function () {

};

ProvisionsController.prototype.onLoadProvisionsData = function (options) {
    var me = this;
	options = options || {sort: {name: 'ASC'}};

	this.service.getProvisionsData(options).then(function (response) {
        me.view.setProvisionsItems({data: response.data, sort: response.sort});
        me.view.setProvisionsTypes(response.types);
    });
};

ProvisionsController.prototype.onLoadProvisionsItems = function (options) {
    var me = this;
    options = options || {sort: {name: 'ASC'}};

	this.service.getProvisionsItems(options).then(function (response) {
        me.view.setProvisionsItems(response);
    });
};

ProvisionsController.prototype.onSaveProvisionsItem = function (item, sort) {
    var me = this;
    this.service.saveProvisionsItem(item, sort).then(function (response) {
        me.view.setProvisionsItems(response);
    	me.view.clearProvisionsForm();
    });
};
