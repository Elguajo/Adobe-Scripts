# Adobe Scripts

A personal collection of automation scripts for Adobe applications.

## Structure

```text
Adobe-Scripts/
├─ photoshop/
│  ├─ export/
│  ├─ layers/
│  └─ utilities/
├─ illustrator/
├─ after-effects/
├─ premiere-pro/
├─ indesign/
└─ shared/
```

## Photoshop

### Export layers to adaptive square PNG

`photoshop/export/export-layers-adaptive-square.jsx`

Exports each visible Photoshop layer as a separate transparent PNG. The object itself is never scaled: the script detects the layer bounds, creates an adaptive square canvas around the object with configurable padding, centers the object, converts the temporary copy to a Smart Object, and exports the result.

Run in Photoshop via **File → Scripts → Browse…** and select the `.jsx` file.

## Notes

- Scripts are organized by Adobe application and task.
- Source documents are not modified unless a script explicitly says otherwise.
- Review the configuration variables at the top of each script before running it.
