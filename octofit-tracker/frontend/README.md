# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and React Router. Start the
backend on port 8000, then run the frontend from this directory with
`npm run dev` (Vite serves it on port 5173).

## Configure the API host

For a GitHub Codespace, create a `.env.local` file in this directory and set
`VITE_CODESPACE_NAME` to the Codespace name (without a protocol or domain):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this variable through `import.meta.env`. Restart the dev server after
changing the file. The frontend then calls
`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`.

If `VITE_CODESPACE_NAME` is empty or missing, the frontend safely uses
`http://localhost:8000` instead. `.env.local` is ignored by Git; do not commit
local environment files.
