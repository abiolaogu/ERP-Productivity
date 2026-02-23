# ERP-Productivity

Office 365-style productivity suite for the ERP platform.

## Suite Apps

- Docs (word processing)
- Sheets (spreadsheets)
- Slides (presentations)
- Mail
- Calendar
- Tasks
- Team Chat

## Deployment Pattern

- Nextcloud for workspace shell and files.
- ONLYOFFICE Docs for collaborative editing.
- ERP SSO via `ERP-Directory`.
- Entitlement checks via `ERP-Platform`.

## Local Run

```bash
docker compose up -d
```

- Productivity workspace: `http://localhost:8089`
- ONLYOFFICE docs: `http://localhost:8085`
