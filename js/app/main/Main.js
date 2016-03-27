function Main () {
    this.durationTimer = null;

    View.apply(this, [MainController]);
};

extend(Main, View);

Main.prototype.render = function () {
    this.el = document.getElementById('content');

    this.el.innerHTML = '' +
        '<div id="layoutBody">' +
            '<header id="header">'+
                '<div class="lastDutyInfo" last-duty-info>' +
                    '<span>Последнее дежурство:&nbsp;</span>' +
                    '<span last-duty-date>-</span>' +
                    '<span>&nbsp;Длительность:&nbsp;</span>' +
                    '<span last-duty-duration>-</span>' +
                    '<span start-duty style="margin-left: 3px; visibility: hidden; text-decoration: underline; color: blue; cursor: pointer;">Начать боевое дежурство</span>' +
                '</div>' +
                '<div class="activeDutyInfo" active-duty-info style="display: none;">' +
                    '<span>Начало дежурства:&nbsp;</span>' +
                    '<span active-duty-start-date>-</span>' +
                    '<span>&nbsp;Время подготовки:&nbsp;</span>' +
                    '<span run-up-time style="text-decoration: underline; color: blue; cursor: pointer;">-</span>' +
                    '<span>&nbsp;Время дежурства:&nbsp;</span>' +
                    '<span duty-duration style="text-decoration: underline; color: blue; cursor: pointer;">-</span>' +
                '</div>' +
                '<div class="clearBoth"></div>' +
            '</header>' +
            '<nav id="navigationPanel">' +
                '<div id="navigation" menu>' +
                    '<a href="#duties">Боевые дежурства</a>' +
                    '<a href="#search">Поиск дежурств</a>' +
                    '<a href="#provisions">Провизия</a>' +
                    '<a href="#accumulators">Аккумуляторы</a>' +
                    '<a href="#statistics">Статистика</a>' +
                '</div>' +
            '</nav>' +
            '<section id="frameContainer" browser></section>' +
            '<footer id="footer"></footer>' +
        '</div>';

    new JournalLayout();
};

Main.prototype.init = function () {
    this.listen('click', this.getEl('start-duty'), 'onStartDuty');
    this.listen('click', this.getEl('run-up-time'), 'onCompleteRunUp');
    this.listen('click', this.getEl('duty-duration'), 'onCompleteDuty');
};

Main.prototype.setBrowser = function (browser) {
    this.getEl('browser').appendChild(browser.el);
};

Main.prototype.setLastDuty = function (lastDuty) {
    if (!isEmpty(lastDuty)) {
        this.getEl('last-duty-date').innerHTML = getDateString(lastDuty.date, true);
        this.getEl('last-duty-duration').innerHTML = getDurationString(lastDuty.duration);
    }
};

Main.prototype.setActiveDuty = function (activeDuty) {
    var startDutyEl = this.getEl('start-duty');
    var activeDutyEl = this.getEl('active-duty-info');
    clearInterval(this.durationTimer);

    if (!isEmpty(activeDuty)) {
        startDutyEl.style.visibility = 'hidden';
        this.getEl('active-duty-start-date').innerHTML = getDateString(activeDuty.date, true);

        var duration = activeDuty.duration;

        var dutyDurationEl = this.getEl('duty-duration');
        dutyDurationEl.innerHTML = getDurationString(duration);

        var runUpTimeEl = this.getEl('run-up-time');
        runUpTimeEl.innerHTML = getDurationString(activeDuty.runUpTime);

        this.durationTimer = setInterval(function () {
            duration++;
            dutyDurationEl.innerHTML = getDurationString(duration);
            if (activeDuty.runUpTime === 0) {
                runUpTimeEl.innerHTML = getDurationString(duration);
            }
        }, 1000);

        activeDutyEl.style.display = 'block';
    } else {
        startDutyEl.style.visibility = 'visible';
        activeDutyEl.style.display = 'none';
    }
};
