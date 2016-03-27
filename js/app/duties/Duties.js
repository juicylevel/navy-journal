function Duties () {
    this.paginator = null;
    this.grid = null;

    View.apply(this, [DutiesController]);
};

extend(Duties, View);

Duties.prototype.init = function () {
    this.createGrid();
    this.createPaginator();
    this.updateDutiesList();
};

Duties.prototype.updateDutiesList = function () {
    this.paginator.refresh();
};

Duties.prototype.setDutyList = function (dutyList) {
    this.grid.setData(dutyList.data, dutyList.sort);
    this.paginator.setData(dutyList.data, dutyList.count);
    this.paginator.setVisible(!isEmpty(dutyList.data));
};

Duties.prototype.createGrid = function () {
    var columns = Settings.getInstance().getDutyListColumns();
    this.grid = new DataGrid('Список боевых дежурств пуст');

    this.grid.setCustom(
        new ActionColumnsConfig(this.grid, null, [EditColumn, RemoveColumn]),
        [new ActiveDutyRow(this.grid)]
    );

    this.grid.setColumns(columns, [40, '', '', '', '', 27, 27]);

    this.el.appendChild(this.grid.el);

    this.listen('sort', this.grid.el, 'onSortDutiesGrid');
    this.listen('editrow', this.grid.el, 'onEditDuty');
    this.listen('removerow', this.grid.el, 'onRemoveDuty');
};

Duties.prototype.createPaginator = function () {
	this.paginator = new Paginator(Settings.getInstance().getDutyListPageSize());
    this.paginator.setVisible(false);
	this.el.appendChild(this.paginator.el);

    this.listen('changepage', this.paginator.el, 'onDutiesChangePage');
};

Duties.prototype.onSortDutiesGrid = function (event) {
    this.controller.onUpdateDutiesList({
        offset: this.paginator.offset,
        pageSize: this.paginator.pageSize,
        sort: event.detail
    });
};

Duties.prototype.onDutiesChangePage = function (event) {
    this.controller.onUpdateDutiesList({
        offset: event.detail.offset,
        pageSize: event.detail.pageSize,
        sort: this.grid.sort
    });
};

Duties.prototype.onEditDuty = function (event) {

};

Duties.prototype.onRemoveDuty = function (event) {

};
