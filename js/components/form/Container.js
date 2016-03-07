function Container () {
    Widget.apply(this, arguments);

    this.render();
}

extend(Container, Widget);

Container.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('itemsContainer', '');
};
