#target indesign

/*
Find Overset Text

Scans the active InDesign document for text frames whose story has overset text.
The script does not modify the document. It selects the first problem frame and
can save a plain-text report.
*/

(function () {
    if (app.documents.length === 0) {
        alert("Open an InDesign document first.");
        return;
    }

    var doc = app.activeDocument;
    var problems = [];

    for (var i = 0; i < doc.textFrames.length; i++) {
        var frame = doc.textFrames[i];

        try {
            if (frame.overflows) {
                var pageName = "Pasteboard / Master";
                try {
                    if (frame.parentPage) pageName = frame.parentPage.name;
                } catch (pageError) {}

                problems.push({
                    frame: frame,
                    page: pageName,
                    index: i + 1
                });
            }
        } catch (e) {}
    }

    if (problems.length === 0) {
        alert("No overset text found.");
        return;
    }

    try {
        app.select(problems[0].frame);
    } catch (selectError) {}

    var report = "Overset text report\r" +
                 "Document: " + doc.name + "\r" +
                 "Found: " + problems.length + "\r\r";

    for (var j = 0; j < problems.length; j++) {
        report += (j + 1) + ". Page " + problems[j].page + " — text frame #" + problems[j].index + "\r";
    }

    var preview = report;
    if (preview.length > 1800) preview = preview.substring(0, 1800) + "\r\r…report truncated in this dialog.";

    alert(preview);

    if (confirm("Save the full overset-text report as a .txt file?")) {
        var file = File.saveDialog("Save overset text report", "Text:*.txt");
        if (file) {
            file.encoding = "UTF-8";
            file.open("w");
            file.write(report);
            file.close();
        }
    }
})();
