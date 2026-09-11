#target photoshop

(function () {
    if (app.documents.length === 0) {
        alert("No Photoshop documents are open.");
        return;
    }

    var outputFolder = Folder.selectDialog("Choose a folder for exported PNG files");
    if (!outputFolder) return;

    var originalDocument = app.activeDocument;
    var documents = [];
    var exported = 0;
    var failed = [];

    // Snapshot the open documents before export.
    for (var i = 0; i < app.documents.length; i++) {
        documents.push(app.documents[i]);
    }

    function stripExtension(name) {
        return name.replace(/\.[^\.]+$/, "");
    }

    function sanitizeFilename(name) {
        name = stripExtension(name);
        name = name.replace(/[\\\/:*?"<>|]/g, "_");
        name = name.replace(/^\s+|\s+$/g, "");
        return name || "document";
    }

    function uniqueFile(folder, baseName) {
        var file = new File(folder.fsName + "/" + baseName + ".png");
        var counter = 2;

        while (file.exists) {
            file = new File(folder.fsName + "/" + baseName + "_" + counter + ".png");
            counter++;
        }

        return file;
    }

    function exportDocumentAsPNG(doc, file) {
        app.activeDocument = doc;

        var options = new ExportOptionsSaveForWeb();
        options.format = SaveDocumentType.PNG;
        options.PNG8 = false; // PNG-24
        options.transparency = true;
        options.interlaced = false;
        options.includeProfile = false;

        doc.exportDocument(file, ExportType.SAVEFORWEB, options);
    }

    try {
        for (var j = 0; j < documents.length; j++) {
            var doc = documents[j];
            var safeName = sanitizeFilename(doc.name);
            var outputFile = uniqueFile(outputFolder, safeName);

            try {
                exportDocumentAsPNG(doc, outputFile);
                exported++;
            } catch (e) {
                failed.push(doc.name + " — " + e.message);
            }
        }
    } finally {
        try {
            app.activeDocument = originalDocument;
        } catch (_) {}
    }

    var message =
        "Export complete.\n\n" +
        "Exported: " + exported + " of " + documents.length + "\n" +
        "Folder: " + outputFolder.fsName;

    if (failed.length > 0) {
        message += "\n\nFailed:\n- " + failed.join("\n- ");
    }

    alert(message);
})();
