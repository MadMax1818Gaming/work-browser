# Work Browser

A local-first personal work dashboard for keeping projects, tasks, notes and useful links organized. Built with plain HTML, CSS and JavaScript: no build tools, package manager, backend or API keys.

## Run it

Open `index.html` in a modern browser, or publish the repository with GitHub Pages:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then Save.
4. Open the Pages URL GitHub provides.

## Features

- Overview dashboard and project workspaces
- Task tracking with completion and priority
- Notes attached to projects
- Website bookmarks
- Search across workspace (Ctrl+K)
- JSON export and import
- Dark/light theme
- Responsive layout
- Local browser storage; works without a server after loading

## Project structure

```
index.html                 App shell
assets/css/app.css         Layout, components and themes
assets/js/store.js         Data model, persistence and backup validation
assets/js/app.js           Views, dialogs, search and event handlers
docs/PROJECT_INDEX.md      Compact guide for humans and AI tools
docs/DATA_MODEL.md         Stored data schema
```

## Data and privacy

Data is stored in this browser's localStorage. It does not automatically sync between devices or upload to GitHub. Use **Settings & backup** to download a JSON backup regularly. Clearing browser site data can erase the local workspace.

## Development rules

- Keep persistence and schema changes in `assets/js/store.js`.
- Keep rendering and interaction logic in `assets/js/app.js`.
- Keep visual styles in `assets/css/app.css`.
- Update `docs/PROJECT_INDEX.md` whenever files or major features change.
- Avoid adding dependencies unless a feature truly needs them.

Version: 0.1.0
