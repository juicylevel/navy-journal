function BrowserController () {
    this.viewsCache = {};

    ViewController.apply(this, arguments);
};

extend(BrowserController, ViewController);

BrowserController.prototype.init = function () {
    window.addEventListener('hashchange', (this.onHashChange).bind(this));

    var hash = getHash();
    if (isEmpty(hash)) {
        setHash('duties')
    } else {
        this.onRedirect(hash);
    }
};

BrowserController.prototype.onHashChange = function (event) {
    this.onRedirect(getHash());
};

BrowserController.prototype.onRedirect = function (path) {
    var viewName, param;
    if (!isEmpty(path)) {
        var pathArr = path.split('/');
        viewName = pathArr[0];
        param = pathArr[1];
    }
    if (!isEmpty(viewName)) {
        this.openView(viewName, param);
    }
};

BrowserController.prototype.openView = function (viewName, param) {
    var viewClass = window[capitalize(viewName)];

    if (!isEmpty(viewClass)) {
        var viewInstance = this.viewsCache[viewName];
        if (isEmpty(viewInstance)) {
            viewInstance = new viewClass(param);
            this.viewsCache[viewName] = viewInstance;
        }
        this.view.showView(viewInstance);
    }
};
