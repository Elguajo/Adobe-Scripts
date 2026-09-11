#target aftereffects

/*
Work Area to Selected Layers

Sets the active composition work area to span from the earliest selected layer
in-point to the latest selected layer out-point.
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

    var start = layers[0].inPoint;
    var end = layers[0].outPoint;

    for (var i = 1; i < layers.length; i++) {
        if (layers[i].inPoint < start) start = layers[i].inPoint;
        if (layers[i].outPoint > end) end = layers[i].outPoint;
    }

    if (start < 0) start = 0;
    if (end > comp.duration) end = comp.duration;

    var duration = end - start;
    if (duration <= 0) {
        alert("The selected layers do not produce a valid work-area duration.");
        return;
    }

    app.beginUndoGroup("Work Area to Selected Layers");
    comp.workAreaStart = start;
    comp.workAreaDuration = duration;
    app.endUndoGroup();
})();
