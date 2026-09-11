#target photoshop

(function () {

    if (app.documents.length === 0) {
        alert("Открой PSD-файл перед запуском.");
        return;
    }

    var sourceDoc = app.activeDocument;

    // Отступ вокруг объекта с каждой стороны.
    // 0.12 = 12%
    var PADDING_PERCENT = 0.12;

    // Только видимые слои
    var EXPORT_ONLY_VISIBLE = true;

    var outputFolder = Folder.selectDialog(
        "Выберите папку для экспорта PNG"
    );

    if (!outputFolder) return;

    var oldUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;

    var layers = [];

    function collectLayers(container) {
        for (var i = 0; i < container.layers.length; i++) {
            var layer = container.layers[i];

            if (layer.typename === "ArtLayer") {
                if (layer.isBackgroundLayer) continue;
                if (EXPORT_ONLY_VISIBLE && !layer.visible) continue;
                layers.push(layer);
            } else if (layer.typename === "LayerSet") {
                if (EXPORT_ONLY_VISIBLE && !layer.visible) continue;
                collectLayers(layer);
            }
        }
    }

    function getBounds(layer) {
        var b = layer.bounds;
        var left = b[0].as("px");
        var top = b[1].as("px");
        var right = b[2].as("px");
        var bottom = b[3].as("px");

        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: right - left,
            height: bottom - top
        };
    }

    function convertToSmartObject() {
        executeAction(
            stringIDToTypeID("newPlacedLayer"),
            undefined,
            DialogModes.NO
        );
    }

    function sanitizeFilename(name) {
        return name
            .replace(/[\\\/:*?"<>|]/g, "_")
            .replace(/^\s+|\s+$/g, "");
    }

    function uniqueFile(folder, baseName) {
        var file = new File(folder.fsName + "/" + baseName + ".png");
        var counter = 2;

        while (file.exists) {
            file = new File(
                folder.fsName + "/" + baseName + "_" + counter + ".png"
            );
            counter++;
        }

        return file;
    }

    function centerLayer(doc, layer) {
        var b = getBounds(layer);

        var objectCenterX = (b.left + b.right) / 2;
        var objectCenterY = (b.top + b.bottom) / 2;

        var canvasCenterX = doc.width.as("px") / 2;
        var canvasCenterY = doc.height.as("px") / 2;

        layer.translate(
            canvasCenterX - objectCenterX,
            canvasCenterY - objectCenterY
        );
    }

    collectLayers(sourceDoc);

    if (layers.length === 0) {
        app.preferences.rulerUnits = oldUnits;
        alert("Нет подходящих слоёв.");
        return;
    }

    var exportedCount = 0;

    try {
        for (var i = 0; i < layers.length; i++) {
            var sourceLayer = layers[i];

            app.activeDocument = sourceDoc;

            // Временный документ. Его размер позже адаптируется под объект.
            var tempDoc = app.documents.add(
                sourceDoc.width,
                sourceDoc.height,
                sourceDoc.resolution,
                sourceLayer.name,
                NewDocumentMode.RGB,
                DocumentFill.TRANSPARENT
            );

            app.activeDocument = sourceDoc;

            var newLayer = sourceLayer.duplicate(
                tempDoc,
                ElementPlacement.PLACEATBEGINNING
            );

            app.activeDocument = tempDoc;
            tempDoc.activeLayer = newLayer;
            newLayer.visible = true;

            var bounds = getBounds(newLayer);

            if (bounds.width <= 0 || bounds.height <= 0) {
                tempDoc.close(SaveOptions.DONOTSAVECHANGES);
                continue;
            }

            // Конвертируем только временную копию в Smart Object.
            // Сам объект не масштабируется.
            convertToSmartObject();
            newLayer = tempDoc.activeLayer;

            bounds = getBounds(newLayer);

            // Квадратный холст определяется по большей стороне объекта + padding.
            var longestSide = Math.max(bounds.width, bounds.height);

            var canvasSize = Math.ceil(
                longestSide * (1 + PADDING_PERCENT * 2)
            );

            if (canvasSize < 1) canvasSize = 1;

            centerLayer(tempDoc, newLayer);

            // Меняется только размер холста — размер объекта сохраняется 1:1.
            tempDoc.resizeCanvas(
                UnitValue(canvasSize, "px"),
                UnitValue(canvasSize, "px"),
                AnchorPosition.MIDDLECENTER
            );

            centerLayer(tempDoc, newLayer);

            var safeName = sanitizeFilename(sourceLayer.name);
            if (!safeName) safeName = "layer_" + (i + 1);

            var outputFile = uniqueFile(outputFolder, safeName);

            var exportOptions = new ExportOptionsSaveForWeb();
            exportOptions.format = SaveDocumentType.PNG;
            exportOptions.PNG8 = false;
            exportOptions.transparency = true;
            exportOptions.interlaced = false;
            exportOptions.includeProfile = false;

            tempDoc.exportDocument(
                outputFile,
                ExportType.SAVEFORWEB,
                exportOptions
            );

            tempDoc.close(SaveOptions.DONOTSAVECHANGES);
            exportedCount++;
        }

        alert(
            "Готово!\n\n" +
            "Экспортировано: " + exportedCount +
            "\nМасштабирование объектов: НЕТ" +
            "\nФорма холста: квадрат" +
            "\nОтступ: " + Math.round(PADDING_PERCENT * 100) + "%" +
            "\nSmart Object: да" +
            "\nФон: прозрачный"
        );

    } catch (e) {
        alert(
            "Ошибка:\n" +
            e.message +
            "\nСтрока: " +
            e.line
        );

    } finally {
        app.preferences.rulerUnits = oldUnits;

        if (app.documents.length > 0) {
            app.activeDocument = sourceDoc;
        }
    }

})();
