function ViewFrame (owner) {
    Widget.apply(this, arguments);

    this.owner = owner;
};

extend(ViewFrame, Widget);
