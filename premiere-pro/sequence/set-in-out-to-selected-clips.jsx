#target premierepro

/*
Set Sequence In/Out to Selected Clips

Sets the active sequence In and Out points to cover the complete temporal span
of the clips currently selected in the timeline.
*/

(function () {
    if (!app.project || !app.project.activeSequence) {
        alert("Open a sequence first.");
        return;
    }

    var sequence = app.project.activeSequence;
    var selection = sequence.getSelection();

    if (!selection || selection.length === 0) {
        alert("Select one or more clips in the timeline first.");
        return;
    }

    var start = selection[0].start.seconds;
    var end = selection[0].end.seconds;

    for (var i = 1; i < selection.length; i++) {
        if (selection[i].start.seconds < start) start = selection[i].start.seconds;
        if (selection[i].end.seconds > end) end = selection[i].end.seconds;
    }

    sequence.setInPoint(start);
    sequence.setOutPoint(end);

    alert("Sequence In/Out updated to the selected clip range.");
})();
