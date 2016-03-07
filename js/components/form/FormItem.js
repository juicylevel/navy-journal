/**
 * Элемент формы.
 * @param fieldLabel Наименование элемента формы.
 */
function FormItem (fieldLabel, fieldWidth, width) {
    Widget.apply(this, arguments);

    this.fieldLabel = fieldLabel;
    this.fieldWidth = fieldWidth;
    this.width = width;

    this.render();
};

extend(FormItem, Widget);

FormItem.prototype.render = function () {
    this.domElement = document.createElement('div');
    this.domElement.className = 'formItem';

    var fieldLabelHtml = '' +
        '<label class="fieldLabel" style="width: ' + this.fieldWidth + 'px;">' +
            this.fieldLabel + ':' +
        '</label>';

    this.domElement.innerHTML = fieldLabelHtml;
}
