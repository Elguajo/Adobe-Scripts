# Adobe Scripts

Practical automation scripts for **Adobe Photoshop, Illustrator, After Effects, Premiere Pro and InDesign**.

[![GitHub stars](https://img.shields.io/github/stars/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Stars)](https://github.com/Elguajo/Adobe-Scripts/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Forks)](https://github.com/Elguajo/Adobe-Scripts/forks)
[![GitHub issues](https://img.shields.io/github/issues/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Issues)](https://github.com/Elguajo/Adobe-Scripts/issues)

![Last commit](https://img.shields.io/github/last-commit/Elguajo/Adobe-Scripts?style=flat-square&logo=github)
![Repo size](https://img.shields.io/github/repo-size/Elguajo/Adobe-Scripts?style=flat-square&logo=github)

---

## 📦 Script Library

The library is intentionally organized by **application → task**. The description tells you *why you would run a script*, not just what API it calls.

**Status:** `✅ Available` = already in active use / established in this repo. `🧪 Needs host test` = added from documented Adobe APIs and common production workflows, but still needs a real run inside the Adobe host before being marked fully verified. `⚠️ Legacy` = relies on an API Adobe is moving away from. `↗ External project` = maintained as a separate repository because it has its own documentation or larger project structure.

### 🟦 Adobe Photoshop

| Script | Use it when… | What it does | Status |
|---|---|---|:---:|
| [`Export Layers — Adaptive Square PNG`](photoshop/export/export-layers-adaptive-square.jsx) | You need separate PNG assets from layers without making small objects artificially huge | Detects each visible layer's real bounds, keeps the object at its original size, creates an adaptive square transparent canvas with padding, centers the object and exports PNG | ✅ Available |
| [`Save All Open Documents`](photoshop/utilities/save-all-open-documents.jsx) | You have many edited PSDs open and do not want to save them one by one | Saves every modified document that already has a file path; skips untitled/new documents instead of unexpectedly opening Save As | 🧪 Needs host test |
| [`Remove Empty Pixel Layers`](photoshop/layers/remove-empty-pixel-layers.jsx) | A PSD has accumulated dozens of blank raster layers | Recursively removes only empty **normal pixel layers** while preserving text, shapes, smart objects, adjustment layers and groups | 🧪 Needs host test |

<details>
<summary><strong>Export Layers — Adaptive Square PNG</strong></summary>

The script processes visible Photoshop layers individually.

- detects the actual object bounds
- creates a temporary document
- converts the copied layer into a **Smart Object**
- preserves the object's original size
- **does not scale the object**
- calculates an adaptive square canvas
- adds configurable free space around the object
- centers the object horizontally and vertically
- exports a transparent PNG
- leaves the original PSD unchanged

```text
Original object                 Exported PNG

    ┌─────────┐             ┌───────────────────┐
    │ OBJECT  │             │                   │
    │         │      →      │   ┌─────────┐     │
    └─────────┘             │   │ OBJECT  │     │
                            │   │         │     │
Object size: preserved      │   └─────────┘     │
                            │                   │
                            └───────────────────┘
                            Canvas: adaptive square
```

</details>

### 🟧 Adobe Illustrator

| Script | Use it when… | What it does | Status |
|---|---|---|:---:|
| [`Fit Artboards to Artwork`](illustrator/artboards/fit-artboards-to-artwork.jsx) | Your artboards contain lots of unnecessary empty space or need consistent padding around artwork | Fits every artboard to artwork on that artboard and expands it by a user-defined padding value; artwork is not scaled or moved | 🧪 Needs host test |
| [`Batch Rename Artboards`](illustrator/artboards/batch-rename-artboards.jsx) | You are preparing icons, screens, exports or variants and need predictable artboard names | Renames all artboards using a base name, starting number and zero-padded sequence such as `Icon 01`, `Icon 02`… | 🧪 Needs host test |

### 🟪 Adobe After Effects

| Script / Project | Use it when… | What it does | Status |
|---|---|---|:---:|
| [`Rename Selected Layers Sequentially`](after-effects/layers/rename-selected-layers-sequentially.jsx) | A composition contains repeated layers that should follow a clean naming convention | Renames selected layers from top to bottom with a base name and zero-padded numbering | 🧪 Needs host test |
| [`Work Area to Selected Layers`](after-effects/compositions/work-area-to-selected-layers.jsx) | You want to preview or render exactly the span occupied by selected layers | Sets the comp work area from the earliest selected layer in-point to the latest selected layer out-point | 🧪 Needs host test |
| [`ffx2gif`](https://github.com/Elguajo/ffx2gif) | You create or maintain text animation presets (`.ffx`) and need visual previews instead of opening presets one by one | Lightweight After Effects tool that automatically generates high-quality `.gif` previews for text animation presets | ↗ External project |

> **Why is `ffx2gif` separate?** It is a larger standalone project with its own README, usage documentation and project context, so this repository links to it instead of duplicating that material here.

### 🟥 Adobe InDesign

| Script | Use it when… | What it does | Status |
|---|---|---|:---:|
| [`Find Overset Text`](indesign/text/find-overset-text.jsx) | Before export/print you need to catch text hidden outside text frames | Scans text frames for overset text, selects the first problem and optionally saves a full text report with page references | 🧪 Needs host test |
| [`Export Pages as Separate PDFs`](indesign/export/export-pages-separate-pdf.jsx) | A multi-page document must be delivered as one PDF per page | Exports every page to an individual PDF using the current InDesign PDF export settings and restores the original page-range preference afterward | 🧪 Needs host test |

### 🟩 Adobe Premiere Pro

> Premiere Pro moved third-party extensibility toward UXP. These JSX utilities use the legacy ExtendScript API and should be treated as migration candidates.

| Script | Use it when… | What it does | Status |
|---|---|---|:---:|
| [`Batch Rename Selected Project Items`](premiere-pro/project/batch-rename-selected-project-items.jsx) | Your Project panel has many clips/bins that need clean sequential display names | Renames the current Project-panel selection with a base name and zero-padded numbering; source files on disk are not renamed | ⚠️ Legacy / 🧪 |
| [`Set Sequence In/Out to Selected Clips`](premiere-pro/sequence/set-in-out-to-selected-clips.jsx) | You want the sequence In/Out range to exactly match a timeline selection | Finds the earliest start and latest end among selected timeline clips and sets sequence In/Out to that span | ⚠️ Legacy / 🧪 |

---

## 📁 Repository Structure

```text
Adobe-Scripts/
│
├── photoshop/
│   ├── export/
│   │   └── export-layers-adaptive-square.jsx
│   ├── layers/
│   │   └── remove-empty-pixel-layers.jsx
│   └── utilities/
│       └── save-all-open-documents.jsx
│
├── illustrator/
│   └── artboards/
│       ├── batch-rename-artboards.jsx
│       └── fit-artboards-to-artwork.jsx
│
├── after-effects/
│   ├── compositions/
│   │   └── work-area-to-selected-layers.jsx
│   └── layers/
│       └── rename-selected-layers-sequentially.jsx
│
├── premiere-pro/
│   ├── project/
│   │   └── batch-rename-selected-project-items.jsx
│   └── sequence/
│       └── set-in-out-to-selected-clips.jsx
│
├── indesign/
│   ├── export/
│   │   └── export-pages-separate-pdf.jsx
│   └── text/
│       └── find-overset-text.jsx
│
├── shared/
└── README.md
```

Standalone projects that are too large or specialized to live inside this repository are linked directly from **Script Library** instead of being duplicated here.

---

## 🚀 Running scripts

### Photoshop / Illustrator

Standalone JSX scripts can normally be launched from the application's Scripts menu or through **Browse / Other Script** depending on the host version. Frequently used scripts can be placed in the application's Scripts folder and the app restarted.

### After Effects

Run `.jsx` files from **File → Scripts → Run Script File…**, or install them in the After Effects Scripts folder / a script launcher.

### InDesign

Open **Window → Utilities → Scripts**, reveal the Scripts Panel folder, place the `.jsx` file there, then double-click it in the Scripts panel.

### Premiere Pro

The Premiere files in this repository currently target the legacy ExtendScript API. Execution depends on your scripting/CEP development setup; these files are kept small so they can also be migrated to UXP as the repository evolves.

---

## 🗺 Roadmap

The next useful additions should come from real production pain points rather than adding scripts just to increase the count.

Likely areas:

- Photoshop batch export and smart-object utilities
- Illustrator export / asset generation
- After Effects project cleanup and render helpers
- Premiere Pro UXP replacements for legacy JSX utilities
- InDesign links, styles and preflight helpers
- reusable shared naming / file helpers

---

## 🐛 Issues & Ideas

Found a bug or have an improvement idea?

[![Open an issue](https://img.shields.io/badge/Open_an-Issue-black?style=for-the-badge&logo=github)](https://github.com/Elguajo/Adobe-Scripts/issues)

Useful issue details:

- Adobe application and version
- operating system
- script name
- expected result
- actual result
- screenshot or error message

---

## ⭐ Support

If one of these scripts saves you time, you can star the repository.

[![Star Adobe Scripts](https://img.shields.io/github/stars/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Star%20Adobe-Scripts&color=yellow)](https://github.com/Elguajo/Adobe-Scripts)

---

**Adobe Scripts** — built for removing repetitive work from creative workflows.

[Repository](https://github.com/Elguajo/Adobe-Scripts) · [Issues](https://github.com/Elguajo/Adobe-Scripts/issues) · [@Elguajo](https://github.com/Elguajo)
