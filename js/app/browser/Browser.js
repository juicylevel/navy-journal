function Browser () {
    View.apply(this, [BrowserController]);
};

extend(Browser, View);

Browser.prototype.render = function () {
    this.el = document.createElement('div');
};

Browser.prototype.showView = function (view) {
    removeChilds(this.el);
    this.el.appendChild(view.el);
};
