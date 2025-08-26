Smart Campus — quick deploy notes

This repo contains an Electron + Vite React frontend and a FastAPI backend.

Goal for demo: deploy the frontend to Vercel and expose the backend via ngrok for a public demo.

Quick steps

1) Prepare backend (local)
   & .\backend\venv\Scripts\Activate.ps1
   pip install -r requirements.txt  # if requirements exists, otherwise install: sqlmodel pyodbc sqlalchemy uvicorn
   # Start backend (bind to 0.0.0.0 for LAN):
   python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

2) Expose backend with ngrok (if backend local)
   # Install ngrok then run:
   ngrok http 8000
   # Copy the HTTPS URL (eg https://abcd1234.ngrok.io)

3) Deploy frontend to Vercel
   - Go to https://vercel.com and create a project from this GitHub repository
   - During import set:
     - Root Directory: frontend
     - Build Command: npm run build
     - Output Directory: dist
   - In Vercel Project Settings -> Environment Variables add:
     - Key: VITE_API_URL  Value: <your backend public URL e.g. ngrok URL>
   - (Optional) Edit frontend/vercel.json to set rewrites directly to your backend URL.

4) Test live site
   - Open the Vercel URL. Frontend will call ${VITE_API_URL}/api/...

Notes


If you want I can commit these changes and push to GitHub (already pushed earlier). Replace "https://YOUR_BACKEND_URL" in `frontend/vercel.json` with your real backend URL.
Netlify deployment
------------------

You can deploy the frontend to Netlify instead of Vercel. Netlify supports simple _redirects and header rules which we use to proxy `/api/*` to a public backend URL.

1) Prepare the frontend build
   cd frontend
   npm install
   npm run build

2) In Netlify (recommended) UI:
   - Create a new site from Git
   - Select this repository and set the "Base directory" to `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - In Site settings -> Build & deploy -> Environment, add `VITE_API_URL` with your public backend URL (e.g. an ngrok or deployed backend URL).

3) Redirects / proxy
   - This repo contains `frontend/netlify.toml` and `frontend/public/_redirects` that proxy `/api/*` to a placeholder `https://YOUR_BACKEND_URL`.
   - Replace `https://YOUR_BACKEND_URL` in `frontend/netlify.toml` and `frontend/public/_redirects` with your real backend URL, or leave the placeholder and instead set `VITE_API_URL` in Netlify; the frontend uses `VITE_API_URL` at runtime for API calls.

4) Test
   - After deploy open the Netlify URL and verify the app fetches data from the backend. If the backend is local, use a tunnel (ngrok/localtunnel) and paste the tunnel URL into Netlify `VITE_API_URL`.

Notes
-----
- Do NOT commit credentials. Use Netlify environment variables for secrets and DB credentials.
- If your backend requires CORS, ensure it allows the Netlify site origin.

CI / Automated deploy (optional)
-------------------------------
This repo includes two GitHub Actions workflows to automate deploys when you push to `main`:

- `.github/workflows/deploy-frontend-netlify.yml` — builds the `frontend` and deploys the `dist` folder to Netlify via the Netlify CLI. You must add these repository secrets:
   - `NETLIFY_AUTH_TOKEN` — Personal access token from Netlify
   - `NETLIFY_SITE_ID` — Your Netlify site ID

- `.github/workflows/deploy-backend-docker.yml` — builds a Docker image for the `backend` and pushes it to the registry you configure. You must add these secrets:
   - `REGISTRY_URL` — e.g. ghcr.io or registry.digitalocean.com
   - `REGISTRY_USERNAME`
   - `REGISTRY_PASSWORD`

After adding the secrets, pushing to `main` will automatically build and deploy the frontend and push a backend image to your registry. You still need to create a running service (on Render, Railway, or your cloud provider) from that image, or configure Render to build directly from the repo (Render supports Dockerfile builds).

