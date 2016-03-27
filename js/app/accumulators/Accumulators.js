function Accumulators () {
    View.apply(this, [AccumulatorsController]);
};

extend(Accumulators, View);

Accumulators.prototype.init = function () {
    this.createEditor();
    this.createGrid();

    this.controller.onLoadAccumulators();
};

Accumulators.prototype.setAccumulators = function (accumulators) {
    this.grid.setData(accumulators.data, accumulators.sort);
};

Accumulators.prototype.clearAccumulatorForm = function () {
    this.onClearButton();
};

Accumulators.prototype.createEditor = function () {
    var editorEl = document.createElement('div');
    editorEl.style.marginBottom = '10px';

    this.form = new AccumulatorForm('vertical');
    var saveBtn = new Button('Сохранить', this.form.el, 'save', 'inline-block');
    var clearBtn = new Button('Очистить', this.form.el, 'clear', 'inline-block');

    this.listen('click', saveBtn.el, 'onSaveButton');
    this.listen('click', clearBtn.el, 'onClearButton');

    editorEl.appendChild(this.form.el);
    editorEl.appendChild(saveBtn.el);
    editorEl.appendChild(clearBtn.el);

    this.el.appendChild(editorEl);
};

Accumulators.prototype.createGrid = function () {
    var columns = Settings.getInstance().getAccumulatorsColumns();
    this.grid = new DataGrid('Список аккумуляторов пуст');

    this.grid.setColumns(columns, ['', 155, 155, 200, 200]);
    this.el.appendChild(this.grid.el);

    this.listen('selectrow', this.grid.el, 'onSelectGridRow');
    this.listen('sort', this.grid.el, 'onSortGrid');
};

Accumulators.prototype.onSaveButton = function () {
    var itemData = this.form.getValues();
    this.controller.onSaveAccumulator(itemData, this.grid.sort);
};

Accumulators.prototype.onClearButton = function () {
    this.form.clear();
    this.grid.deselectRows();
};

Accumulators.prototype.onSelectGridRow = function (event) {
    if (event.detail.selected) {
        var selectedItem = event.detail.data;
        this.form.setValues({
            id: selectedItem.id,
            name: selectedItem.name,
            voltage: selectedItem.voltage,
            capacity: selectedItem.capacity,
            start_exploitation: selectedItem.start_exploitation,
            end_exploitation: selectedItem.end_exploitation
        });
        this.form.el.scrollIntoView();
    } else {
        this.form.clear();
    }
};

Accumulators.prototype.onSortGrid = function (event) {
    this.controller.onLoadAccumulators({sort: event.detail});
};
