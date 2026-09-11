#target premierepro

/*
Batch Rename Selected Project Items

Renames items selected in the active Premiere Pro Project panel using a base
name plus zero-padded numbering. This changes project item display names only;
it does not rename source files on disk.

Requires Premiere Pro 15.4+ for app.getCurrentProjectViewSelection().
*/

(function () {
    if (!app.project) {
        alert("Open a Premiere Pro project first.");
        return;
    }

    if (typeof app.getCurrentProjectViewSelection !== "function") {
        alert("This Premiere Pro version does not expose the current Project panel selection. Premiere Pro 15.4+ is required.");
        return;
    }

    var items = app.getCurrentProjectViewSelection();
    if (!items || items.length === 0) {
        alert("Select one or more items in the Project panel first.");
        return;
    }

    var baseName = prompt("Base project item name:", "Clip");
    if (baseName === null || baseName === "") return;

    var startInput = prompt("Starting number:", "1");
    if (startInput === null) return;

    var startNumber = parseInt(startInput, 10);
    if (isNaN(startNumber)) {
        alert("Starting number must be an integer.");
        return;
    }

    var digitsInput = prompt("Minimum number of digits:", "3");
    if (digitsInput === null) return;

    var digits = parseInt(digitsInput, 10);
    if (isNaN(digits) || digits < 1) digits = 1;

    function padNumber(value, length) {
        var result = String(value);
        while (result.length < length) result = "0" + result;
        return result;
    }

    var renamed = 0;

    for (var i = 0; i < items.length; i++) {
        try {
            items[i].name = baseName + " " + padNumber(startNumber + i, digits);
            renamed++;
        } catch (e) {}
    }

    alert("Renamed project items: " + renamed + "\n\nSource files on disk were not renamed.");
})();
