#target aftereffects

/*
Rename Selected Layers Sequentially

Renames selected layers in the active composition from top to bottom using
zero-padded numbering. Example: Card 01, Card 02, Card 03...
*/

(function () {
    if (!app.project || !(app.project.activeItem instanceof CompItem)) {
        alert("Open a composition and select one or more layers.");
        return;
    }

    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;

    if (!layers || layers.length === 0) {
        alert("Select one or more layers first.");
        return;
    }

    var baseName = prompt("Base layer name:", "Layer");
    if (baseName === null || baseName === "") return;

    var startInput = prompt("Starting number:", "1");
    if (startInput === null) return;

    var startNumber = parseInt(startInput, 10);
    if (isNaN(startNumber)) {
        alert("Starting number must be an integer.");
        return;
    }

    var digitsInput = prompt("Minimum number of digits:", "2");
    if (digitsInput === null) return;

    var digits = parseInt(digitsInput, 10);
    if (isNaN(digits) || digits < 1) digits = 1;

    function padNumber(value, length) {
        var result = String(value);
        while (result.length < length) result = "0" + result;
        return result;
    }

    layers.sort(function (a, b) {
        return a.index - b.index;
    });

    app.beginUndoGroup("Rename Selected Layers Sequentially");

    for (var i = 0; i < layers.length; i++) {
        layers[i].name = baseName + " " + padNumber(startNumber + i, digits);
    }

    app.endUndoGroup();
})();
