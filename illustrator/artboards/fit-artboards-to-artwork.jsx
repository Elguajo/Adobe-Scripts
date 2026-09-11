#target illustrator

/*
Fit Artboards to Artwork

Fits every artboard to the artwork on that artboard, then adds configurable padding.
The artwork itself is never scaled or moved; only the artboard rectangle changes.
*/

(function () {
    if (app.documents.length === 0) {
        alert("Open an Illustrator document first.");
        return;
    }

    var doc = app.activeDocument;
    var input = prompt("Padding around artwork in points (Illustrator px are normally equivalent at 72 ppi):", "20");

    if (input === null) return;

    var padding = parseFloat(input);
    if (isNaN(padding) || padding < 0) {
        alert("Padding must be a number greater than or equal to 0.");
        return;
    }

    var originalIndex = doc.artboards.getActiveArtboardIndex();
    var fitted = 0;
    var empty = 0;

    try {
        for (var i = 0; i < doc.artboards.length; i++) {
            doc.selection = null;
            doc.artboards.setActiveArtboardIndex(i);
            doc.selectObjectsOnActiveArtboard();

            if (!doc.selection || doc.selection.length === 0) {
                empty++;
                continue;
            }

            if (doc.fitArtboardToSelectedArt(i)) {
                var rect = doc.artboards[i].artboardRect;
                doc.artboards[i].artboardRect = [
                    rect[0] - padding,
                    rect[1] + padding,
                    rect[2] + padding,
                    rect[3] - padding
                ];
                fitted++;
            }
        }
    } finally {
        doc.selection = null;
        doc.artboards.setActiveArtboardIndex(originalIndex);
    }

    alert("Done.\n\nArtboards fitted: " + fitted + "\nEmpty artboards skipped: " + empty + "\nPadding: " + padding + " pt");
})();
