# Data Model

Storage key: `work-browser-data-v1` in browser localStorage.

Top-level object:
- `version`: integer schema version (currently 1)
- `projects`: array of project records
- `tasks`: array of task records
- `notes`: array of note records
- `bookmarks`: array of bookmark records

## Records

Project: `{ id, name, description, color, icon, createdAt }`

Task: `{ id, title, projectId, done, priority, createdAt }`

Note: `{ id, title, body, projectId, updatedAt }`

Bookmark: `{ id, title, url, createdAt }`

IDs are generated in the browser. `projectId` may be an empty string for unassigned items. Deleting a project also deletes its associated tasks and notes; bookmarks are independent.

## Compatibility
Do not silently change the meaning or remove fields in version 1. For incompatible changes, add a migration in store.js and increment the schema version. Validate imported backups before replacing live data.
