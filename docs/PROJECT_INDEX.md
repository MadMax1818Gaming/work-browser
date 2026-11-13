# Work Browser — Project Index

This file is the fast-start map for maintainers and AI coding assistants. Read this before scanning source files.

## Product goal
A simple local-first workspace that organizes projects, tasks, notes and bookmarks. The UI is a dashboard, not a full web browser. No server, login, tracking or external API is required.

## Architecture
- `index.html`: semantic app shell and script/style entry points only.
- `assets/js/store.js`: single source of truth; starter data, localStorage persistence, CRUD operations, import/export.
- `assets/js/app.js`: UI state, rendering, dialogs, navigation, search, keyboard shortcuts and event delegation.
- `assets/css/app.css`: all visual design, responsive breakpoints and light theme.
- `docs/DATA_MODEL.md`: persistent object shapes and compatibility rules.

## Data flow
UI event → WorkStore method → in-memory data mutation → localStorage write → `workspace:changed` event → render.

## Key global API
`window.WorkStore` methods:
- Read: `all()`, `projects()`, `tasks()`, `notes()`, `bookmarks()`
- Projects: `addProject(values)`, `updateProject(id, values)`, `deleteProject(id)`
- Tasks: `addTask(values)`, `toggleTask(id)`, `deleteTask(id)`
- Notes: `addNote(values)`, `updateNote(id, values)`, `deleteNote(id)`
- Bookmarks: `addBookmark(values)`, `deleteBookmark(id)`
- Backup: `export()`, `import(object)`, `reset()`

## UI conventions
- Views: dashboard, projects, tasks, notes, bookmarks, settings, project.
- Navigation uses `data-view`; actions use `data-action`.
- Dynamic user content must pass through `esc()` before HTML insertion.
- No inline script dependencies or framework.
- Keep buttons keyboard accessible and links safe (`rel="noopener noreferrer"`).

## Important limitations
- Data belongs to the current browser profile and device.
- No cloud sync, collaboration, automatic repository indexing or AI API connection exists yet.
- GitHub Pages hosts static app files; it does not provide private per-user storage.

## Safe change workflow
1. Read this index and DATA_MODEL.
2. Inspect only the source file responsible for the feature.
3. Preserve existing WorkStore method contracts unless deliberately migrating.
4. Test create/edit/delete, refresh persistence, export/import and mobile layout.
5. Update this index and README if architecture or setup changes.
