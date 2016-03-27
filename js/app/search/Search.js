function Search () {
    View.apply(this, [SearchController]);
};

extend(Search, View);

Search.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
    this.el.innerHTML = 'Раздел "Поиск дежурств" в разработке...';
};

Search.prototype.init = function () {

};
