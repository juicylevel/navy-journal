function Statistics () {
    View.apply(this, [SearchController]);
};

extend(Statistics, View);

Statistics.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
    this.el.innerHTML = 'Раздел "Статистика" в разработке...';
};

Statistics.prototype.init = function () {

};
