<!-- HERO -->

<div align="center">

<a href="https://github.com/Elguajo">
  <img
    width="96"
    height="96"
    src="https://avatars.githubusercontent.com/u/38797754?v=4"
    alt="Elguajo"
  >
</a>

# Adobe Scripts

### Automation scripts and small tools for Adobe applications

A personal collection of useful scripts for  
**Adobe Photoshop, Illustrator, After Effects, Premiere Pro and InDesign.**

<br>

[![GitHub stars](https://img.shields.io/github/stars/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Stars)](https://github.com/Elguajo/Adobe-Scripts/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Forks)](https://github.com/Elguajo/Adobe-Scripts/forks)
[![GitHub issues](https://img.shields.io/github/issues/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Issues)](https://github.com/Elguajo/Adobe-Scripts/issues)

<br>

![Last commit](https://img.shields.io/github/last-commit/Elguajo/Adobe-Scripts?style=flat-square&logo=github)
![Repo size](https://img.shields.io/github/repo-size/Elguajo/Adobe-Scripts?style=flat-square&logo=github)
![ExtendScript](https://img.shields.io/badge/ExtendScript-JSX-yellow?style=flat-square&logo=javascript&logoColor=black)
![Adobe](https://img.shields.io/badge/Adobe-Automation-FF0000?style=flat-square&logo=adobe&logoColor=white)

<br>

> Small scripts for repetitive Adobe tasks that should not require repetitive manual work.

</div>

---

## ✨ About

**Adobe Scripts** is my personal collection of automation scripts, helpers and workflow tools for Adobe applications.

The repository is intended for scripts that solve practical repetitive tasks:

- batch exporting
- layer processing
- document preparation
- asset generation
- file organization
- repetitive editing operations
- workflow automation
- small quality-of-life utilities

The main goal is simple:

> **Do repetitive work once in code instead of doing it manually every time.**

---

## 📦 Script Library

### 🟦 Adobe Photoshop

| Script | Description | Status |
|---|---|:---:|
| [`Export Layers — Adaptive Square PNG`](photoshop/export/export-layers-adaptive-square.jsx) | Exports visible layers as separate transparent PNG files using an adaptive square canvas without scaling the original object | ✅ Available |

<details>
<summary><strong>Export Layers — Adaptive Square PNG</strong></summary>

<br>

The script processes every visible Photoshop layer individually.

### What it does

- detects the actual object bounds
- creates a temporary document
- converts the copied layer into a **Smart Object**
- preserves the object's original size
- **does not scale the object**
- calculates an adaptive square canvas
- adds configurable free space around the object
- centers the object horizontally and vertically
- exports the result as a transparent PNG
- leaves the original PSD unchanged

### Example

```text
Original layer

       ┌───────────┐
       │  OBJECT   │
       │           │
       └───────────┘


Exported PNG

┌───────────────────────┐
│                       │
│     ┌───────────┐     │
│     │  OBJECT   │     │
│     │           │     │
│     └───────────┘     │
│                       │
└───────────────────────┘

Object size → preserved
Canvas size → adaptive
Background → transparent
```

### Run

In Photoshop:

```text
File
└── Scripts
    └── Browse...
```

Select:

```text
photoshop/export/export-layers-adaptive-square.jsx
```

Then choose the destination folder.

</details>

---

## 🧩 Adobe Applications

<table>
<tr>
<td align="center" width="20%">

### Photoshop
**Active**

Exporting, layers, assets  
and workflow automation.

</td>

<td align="center" width="20%">

### Illustrator
**Planned**

Vector processing  
and repetitive operations.

</td>

<td align="center" width="20%">

### After Effects
**Planned**

Composition and  
motion workflow tools.

</td>

<td align="center" width="20%">

### Premiere Pro
**Planned**

Editing and  
project automation.

</td>

<td align="center" width="20%">

### InDesign
**Planned**

Layout and  
document automation.

</td>
</tr>
</table>

---

## 📁 Repository Structure

```text
Adobe-Scripts/
│
├── photoshop/
│   ├── export/
│   │   └── export-layers-adaptive-square.jsx
│   │
│   ├── layers/
│   └── utilities/
│
├── illustrator/
│
├── after-effects/
│
├── premiere-pro/
│
├── indesign/
│
├── shared/
│
└── README.md
```

Scripts are grouped first by **Adobe application**, then by their purpose.

---

## 🚀 Installation

Most scripts do not require installation.

### Run a JSX script manually

1. Download the `.jsx` file.
2. Open the required Adobe application.
3. Open:

```text
File → Scripts → Browse...
```

4. Select the script.

That's it.

---

## ⚡ Optional permanent installation

For scripts you use frequently, you can place them inside the application's Scripts directory.

After restarting the Adobe application, the script can appear directly inside:

```text
File → Scripts
```

The exact Scripts directory depends on the Adobe application and installed version.

---

## 🧠 Principles

Scripts in this repository should follow a few basic rules:

```text
✓ automate repetitive work
✓ avoid destructive changes when possible
✓ preserve the source document
✓ expose important configuration clearly
✓ keep scripts focused on one task
✓ prefer predictable behavior over hidden magic
```

Whenever possible, temporary documents and temporary layers are used instead of modifying source assets.

---

## 🛠 Technologies

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-ExtendScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![JSX](https://img.shields.io/badge/Adobe-JSX-FF0000?style=for-the-badge&logo=adobe&logoColor=white)
![Photoshop](https://img.shields.io/badge/Photoshop-Scripting-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white)

</div>

Adobe automation in this repository may use:

- ExtendScript / JSX
- Adobe scripting APIs
- JavaScript
- Action Manager APIs where necessary
- application-specific scripting interfaces

---

## 🗺 Roadmap

More scripts will be added as real workflow problems appear.

Planned categories include:

- [ ] Photoshop batch export tools
- [ ] Photoshop layer utilities
- [ ] Photoshop document utilities
- [ ] Illustrator automation
- [ ] After Effects workflow tools
- [ ] Premiere Pro utilities
- [ ] InDesign automation
- [ ] reusable shared helpers

The repository is intentionally workflow-driven rather than built around artificial feature targets.

---

## 🐛 Issues & Ideas

Found a bug or have an improvement idea?

[![Open an issue](https://img.shields.io/badge/Open_an-Issue-black?style=for-the-badge&logo=github)](https://github.com/Elguajo/Adobe-Scripts/issues)

When reporting a problem, it helps to include:

- Adobe application
- application version
- operating system
- script name
- expected result
- actual result
- screenshot or error message

---

## ⭐ Support

If one of these scripts saves you time, you can star the repository.

<div align="center">

[![Star Adobe Scripts](https://img.shields.io/github/stars/Elguajo/Adobe-Scripts?style=for-the-badge&logo=github&label=Star%20Adobe-Scripts&color=yellow)](https://github.com/Elguajo/Adobe-Scripts)

</div>

---

<div align="center">

### Adobe Scripts

**Built for removing repetitive work from creative workflows.**

[Repository](https://github.com/Elguajo/Adobe-Scripts)
&nbsp;•&nbsp;
[Issues](https://github.com/Elguajo/Adobe-Scripts/issues)
&nbsp;•&nbsp;
[Profile](https://github.com/Elguajo)

<br>

<sub>Made and maintained by <a href="https://github.com/Elguajo">@Elguajo</a></sub>

<br><br>

<a href="#adobe-scripts">Back to top ↑</a>

</div>
