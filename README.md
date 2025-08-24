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

- Do NOT commit secrets. Use environment variables for DB credentials on the backend.
- If using SQL Server as backend DB, ensure the backend host can reach the SQL Server instance.

If you want I can commit these changes and push to GitHub (already pushed earlier). Replace "https://YOUR_BACKEND_URL" in `frontend/vercel.json` with your real backend URL.
