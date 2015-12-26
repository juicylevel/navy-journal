/**
 * Представление журнала.
 * Включает в себя стартовый диалог, панель навигации, контейнер фреймов,
 * верхнюю панель со статусом дежурства.
 */
function JournalView (domElement) {
    View.apply(this, arguments);
};

extend(JournalView, View);

/**
 * Получение списка обработчиков оповещений.
 * @return array [type: 'string', handler: 'function']
 */
JournalView.prototype.getHandlers = function () {
	return [
		{type: CHANGE_LAST_DUTY_INFO, handler: this.onChangeLastDutyInfo}
	];
};

/**
 * @public
 * Отрисовка компонента.
 */
JournalView.prototype.render = function () {
    this.domElement = document.getElementsByTagName('body')[0];
    this.sendNotification(new Notification(VIEW_READY));
};

/**
 * Показ диалога с предложением начать новое боевое дежурство.
 */
JournalView.prototype.showStartDutyDialog = function () {
    var startDutyDialogHtml = '' +
        '<div>' +
            '<button button="startDuty">Начать боевое дежурство</button> ' +
            '<button button="showJournal">Открыть журнал</button>'
        '</div>';

    var startDutyDialogEl = document.createElement('div');
    startDutyDialogEl.className = 'startDutyDialog';
    startDutyDialogEl.innerHTML = startDutyDialogHtml;

    var startDutyButton = getElementsByAttribute('button', 'startDuty', startDutyDialogEl)[0];
    var showJournalButton = getElementsByAttribute('button', 'showJournal', startDutyDialogEl)[0];

    startDutyButton.addEventListener('click', (function () {
        this.sendNotification(new Notification(CALL_START_DUTY));
    }).bind(this));

    showJournalButton.addEventListener('click', (function () {
        this.sendNotification(new Notification(CALL_SHOW_JOURNAL));
    }).bind(this));

    this.domElement.appendChild(startDutyDialogEl);
};

/**
 * Отрисовка пользовательского интерфейса журнала.
 */
JournalView.prototype.renderJournalUI = function () {
    removeChilds(this.domElement);

    var journalUIHtml = '' +
        '<div id="layoutBody">' +
            '<header id="header">'+
                '<div class="lastDutyInfo">' +
                    '<span style="font-weight: bold;">Последнее дежурство:</span>&nbsp;' +
                    '<span output="lastDutyDate"> - </span>&nbsp;' +
                    '<span style="font-weight: bold;">Длительность:</span>&nbsp;' +
                    '<span output="lastDutyDuration"> - </span>&nbsp;' +
                '</div>' +
            '</header>' +
            '<nav id="navigationPanel">' +
                '<div id="navigation">' +

                '</div>' +
            '</nav>' +
            '<section id="frameContainer">' +

            '</section>' +
            '<footer id="footer"></footer>' +
        '</div>';

    this.domElement.innerHTML = journalUIHtml;

    new JournalLayout();
};

/**
 * Обработка оповещения об изенении информации о последнем дежурстве.
 */
JournalView.prototype.onChangeLastDutyInfo = function (lastDutyInfo) {
    if (!isEmpty(lastDutyInfo)) {
        this.lastDutyDate = lastDutyInfo.date;
        this.lastDutyDuration = lastDutyInfo.duration;
    } else {
        this.lastDutyDate = '-';
        this.lastDutyDuration = '-';
    }

    var lastDutyInfoEl = this.domElement.getElementsByClassName('lastDutyInfo');
    if (!isEmpty(lastDutyInfoEl) && lastDutyInfoEl.length > 0) {
        lastDutyInfoEl = lastDutyInfoEl[0];
        var lastDutyDateEl = getElementsByAttribute('output', 'lastDutyDate', this.domElement)[0];
        var lastDutyDurationEl = getElementsByAttribute('output', 'lastDutyDuration', this.domElement)[0];
        lastDutyDateEl.innerHTML = this.lastDutyDate;
        lastDutyDurationEl.innerHTML = this.lastDutyDuration;
    }
};
