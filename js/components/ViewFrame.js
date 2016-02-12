function ViewFrame (owner) {
    Widget.apply(this, arguments);

    this.owner = owner;
    this.name = '';
};

extend(ViewFrame, Widget);
