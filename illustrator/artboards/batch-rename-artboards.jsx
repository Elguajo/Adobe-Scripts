#target illustrator

/*
Batch Rename Artboards

Renames every artboard using a base name plus zero-padded numbering.
Example: Icon 01, Icon 02, Icon 03...
*/

(function () {
    if (app.documents.length === 0) {
        alert("Open an Illustrator document first.");
        return;
    }

    var doc = app.activeDocument;
    var baseName = prompt("Base artboard name:", "Artboard");
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

    for (var i = 0; i < doc.artboards.length; i++) {
        doc.artboards[i].name = baseName + " " + padNumber(startNumber + i, digits);
    }

    alert("Renamed " + doc.artboards.length + " artboards.");
})();
