/**
 * Модель фрейма с таблицей журнала.
 */
function DutyModel () {
	Model.apply(this, arguments);

	this.columns = [];
	this.rows = [];
};

extend(DutyModel, Model);

/**
 * Установка колонок таблицы.
 */
DutyModel.prototype.setColumns = function (columns) {
	this.columns = columns;
	this.sendNotification(new Notification(CHANGE_JOURNAL_GRID_COLUMNS, this.columns));
};

/**
 * Установка рядов таблицы.
 */
DutyModel.prototype.setRows = function (rows) {
	this.rows = rows;
	this.sendNotification(new Notification(CHANGE_JOURNAL_GRID_ROWS, this.rows));
};
