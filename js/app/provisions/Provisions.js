function Provisions () {
    this.form = null;
    this.grid = null;
    View.apply(this, [ProvisionsController]);
};

extend(Provisions, View);

Provisions.prototype.init = function () {
    this.createEditor();
    this.createGrid();

    this.controller.onLoadProvisionsData();
};

Provisions.prototype.setProvisionsItems = function (provisionsItems) {
    this.grid.setData(provisionsItems.data, provisionsItems.sort);
};

Provisions.prototype.setProvisionsTypes = function (provisionsTypes) {
    this.form.setProvisionsTypes(provisionsTypes);
};

Provisions.prototype.clearProvisionsForm = function () {
    this.onClearButton();
};

Provisions.prototype.createEditor = function () {
    var editorEl = document.createElement('div');
    editorEl.style.marginBottom = '10px';

    this.form = new ProvisionsForm('horizontal', 'inline-block');
    var saveBtn = new Button('Сохранить', this.form.el, 'save', 'inline-block');
    var clearBtn = new Button('Очистить', this.form.el, 'clear', 'inline-block');

    this.listen('click', saveBtn.el, 'onSaveButton');
    this.listen('click', clearBtn.el, 'onClearButton');

    editorEl.appendChild(this.form.el);
    editorEl.appendChild(saveBtn.el);
    editorEl.appendChild(clearBtn.el);

    this.el.appendChild(editorEl);
};

Provisions.prototype.createGrid = function () {
    var columns = Settings.getInstance().getProvisionsItemColumns();
    this.grid = new DataGrid('Список элементов провизии пуст');

    this.grid.setColumns(columns, ['', 250]);
    this.el.appendChild(this.grid.el);

    this.listen('selectrow', this.grid.el, 'onSelectGridRow');
    this.listen('sort', this.grid.el, 'onSortGrid');
};

Provisions.prototype.onSaveButton = function () {
    var itemData = this.form.getValues();
    this.controller.onSaveProvisionsItem(itemData, this.grid.sort);
};

Provisions.prototype.onClearButton = function () {
    this.form.clear();
    this.grid.deselectRows();
};

Provisions.prototype.onSelectGridRow = function (event) {
    if (event.detail.selected) {
        var selectedItem = event.detail.data;
        this.form.setValues({
            id: selectedItem.id,
            name: selectedItem.name,
            type_id: selectedItem.type_id
        });
        this.form.el.scrollIntoView();
    } else {
        this.form.clear();
    }
};

Provisions.prototype.onSortGrid = function (event) {
    this.controller.onLoadProvisionsItems({sort: event.detail});
};
