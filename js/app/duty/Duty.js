function Duty (dutyId) {
    this.dutyId = dutyId;
    this.form = null;
    View.apply(this, [DutyController]);
};

extend(Duty, View);

Duty.prototype.init = function () {
    this.form = new DutyForm('vertical');

    this.el.appendChild(this.form.el);
};
