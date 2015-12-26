/**
 * Модель фрейма с таблицей журнала.
 */
function DutyGridFrameModel () {
	this.super(arguments);

	this.columns = [];
	this.rows = [];
};

ClassManager.getInstance().extend(DutyGridFrameModel, Model);

/**
 * Установка колонок таблицы.
 */
DutyGridFrameModel.prototype.setColumns = function (columns) {
	this.columns = columns;
	this.sendNotification(new Notification(CHANGE_JOURNAL_GRID_COLUMNS, this.columns));
};

/**
 * Установка рядов таблицы.
 */
DutyGridFrameModel.prototype.setRows = function (rows) {
	this.rows = rows;
	this.sendNotification(new Notification(CHANGE_JOURNAL_GRID_ROWS, this.rows));
};
