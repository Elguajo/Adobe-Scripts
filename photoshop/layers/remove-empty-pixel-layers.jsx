#target photoshop

/*
Remove Empty Pixel Layers

Recursively removes empty normal pixel layers from the active Photoshop document.
Adjustment layers, text, shapes, smart objects and groups are preserved.
This script changes the source document, so it asks for confirmation first.
*/

(function () {
    if (app.documents.length === 0) {
        alert("Open a Photoshop document first.");
        return;
    }

    if (!confirm("Remove empty normal pixel layers from the active document?\n\nThis changes the document. Save first if needed.")) {
        return;
    }

    var doc = app.activeDocument;
    var removed = 0;

    function isEmptyPixelLayer(layer) {
        if (layer.typename !== "ArtLayer") return false;
        if (layer.isBackgroundLayer) return false;
        if (layer.kind !== LayerKind.NORMAL) return false;

        try {
            var b = layer.bounds;
            var width = b[2].as("px") - b[0].as("px");
            var height = b[3].as("px") - b[1].as("px");
            return width <= 0 || height <= 0;
        } catch (e) {
            return false;
        }
    }

    function clean(container) {
        for (var i = container.layers.length - 1; i >= 0; i--) {
            var layer = container.layers[i];

            if (layer.typename === "LayerSet") {
                clean(layer);
            } else if (isEmptyPixelLayer(layer)) {
                layer.remove();
                removed++;
            }
        }
    }

    clean(doc);
    alert("Removed empty pixel layers: " + removed);
})();
