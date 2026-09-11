#target indesign

/*
Export Pages as Separate PDFs

Exports every page in the active InDesign document to its own PDF file using
the current PDF export settings. The global page-range preference is restored
when the script finishes.
*/

(function () {
    if (app.documents.length === 0) {
        alert("Open an InDesign document first.");
        return;
    }

    var doc = app.activeDocument;
    var folder = Folder.selectDialog("Choose a folder for separate page PDFs");
    if (!folder) return;

    function sanitize(name) {
        return String(name).replace(/[\\\/:*?\"<>|]/g, "_").replace(/^\s+|\s+$/g, "");
    }

    function uniqueFile(basePath) {
        var file = new File(basePath + ".pdf");
        var counter = 2;

        while (file.exists) {
            file = new File(basePath + "_" + counter + ".pdf");
            counter++;
        }

        return file;
    }

    var baseName = doc.name.replace(/\.[^\.]+$/, "");
    var oldRange = app.pdfExportPreferences.pageRange;
    var exported = 0;

    try {
        for (var i = 0; i < doc.pages.length; i++) {
            var page = doc.pages[i];
            app.pdfExportPreferences.pageRange = page.name;

            var output = uniqueFile(
                folder.fsName + "/" + sanitize(baseName) + "_page_" + sanitize(page.name)
            );

            doc.exportFile(ExportFormat.PDF_TYPE, output, false);
            exported++;
        }
    } catch (e) {
        alert("Export stopped: " + e.message);
    } finally {
        app.pdfExportPreferences.pageRange = oldRange;
    }

    alert("Exported separate PDF pages: " + exported);
})();
