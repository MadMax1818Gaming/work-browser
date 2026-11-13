# Integrations and browser tabs

## Browser-style tabs
The app includes internal tabs for Workspace, Gmail, Google Search, and AI Chat. These are application views, not Chrome's actual tabs. A web app cannot read or control the host browser's tabs. A future desktop shell (for example, Tauri or Electron) can add a real browser engine and tab management.

## Gmail
Gmail is launched at https://mail.google.com/ because Google blocks embedding Gmail in an iframe. A true in-app Gmail integration requires:
1. A Google Cloud project and OAuth consent configuration.
2. Gmail API enabled and only the minimum scopes needed.
3. A secure backend handling OAuth callbacks and token storage.
4. User consent and a clear disconnect/revoke flow.

Do not collect a Google password or store OAuth refresh tokens in localStorage.

## AI chat API
The current chat view is a safe setup placeholder. Before sending requests to an AI provider, add a server-side endpoint (for example, /api/chat) and store the provider API key in the hosting provider's server-side environment secrets. Never put API keys in frontend JavaScript, GitHub commits, or localStorage. GitHub Pages is static hosting and cannot protect a secret key.

## UI and motion references
- Anime.js 4: https://animejs.com/documentation/animation
- Motion: https://motion.dev/docs/animate
- Untitled UI React component patterns: https://www.untitledui.com/react/components

This app remains vanilla HTML/CSS/JS, so it borrows spacing, hierarchy, button and tab patterns rather than importing React components.
