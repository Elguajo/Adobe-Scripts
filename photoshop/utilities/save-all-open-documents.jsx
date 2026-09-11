#target photoshop

/*
Save All Open Documents

Saves every already-saved Photoshop document that currently has unsaved changes.
New/untitled documents are skipped so the script never opens a Save As dialog unexpectedly.
*/

(function () {
    if (app.documents.length === 0) {
        alert("No open documents.");
        return;
    }

    var savedCount = 0;
    var unchangedCount = 0;
    var skipped = [];

    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        var hasFile = true;

        try {
            var existingFile = doc.fullName;
        } catch (e) {
            hasFile = false;
        }

        if (!hasFile) {
            skipped.push(doc.name);
            continue;
        }

        if (doc.saved) {
            unchangedCount++;
            continue;
        }

        try {
            doc.save();
            savedCount++;
        } catch (saveError) {
            skipped.push(doc.name + " (" + saveError.message + ")");
        }
    }

    var message = "Done.\n\nSaved: " + savedCount + "\nAlready up to date: " + unchangedCount;

    if (skipped.length) {
        message += "\nSkipped: " + skipped.length + "\n\n" + skipped.join("\n");
    }

    alert(message);
})();
