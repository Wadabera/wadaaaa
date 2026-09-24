# Standalone Frontend

This `frontend/` directory is independent from the existing backend. It communicates with the backend only through HTTP API endpoints configured in `.env` and `src/config/resources.js`.

## Setup

```bash
cd frontend
copy .env.example .env
npm install
npm start
```

The app currently uses the parent project's installed React tooling when available:

```bash
npm run build
```

## Environment

Create `.env` from `.env.example`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Enterprise Console
REACT_APP_ENABLE_AUTH=true
REACT_APP_DEFAULT_PAGE=dashboard
```

## API Integration

Add or adjust backend resources in:

```text
src/config/resources.js
```

Each resource supports list, create, update, delete, search, filtering, sorting, and pagination when the backend endpoint supports those query parameters.

No existing backend files are modified by this frontend.
