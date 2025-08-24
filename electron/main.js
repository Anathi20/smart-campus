const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
// Dev-only: we will attempt to install React DevTools when running in
// development to help debug renderer issues. This block is safe to leave
// in source but will only run when NODE_ENV !== 'production'.
let installDevtools = async () => {};

let pyProc;
let win;

function startPython() {
  const isWin = process.platform === "win32";
  const pythonCmd = isWin ? "python" : "python3";

  // Run uvicorn directly for hot reload during dev
  pyProc = spawn(pythonCmd, ["-m", "uvicorn", "backend.main:app", "--port", "8000", "--reload"], {
    cwd: path.join(__dirname, ".."),
    shell: true,
  });

  pyProc.stdout.on("data", (d) => process.stdout.write(`[PY] ${d}`));
  pyProc.stderr.on("data", (d) => process.stderr.write(`[PY] ${d}`));
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = process.env.NODE_ENV !== "production";
  // Install React DevTools in dev to make debugging easier
  if (isDev) {
    installDevtools().catch((e) => {
      // Non-fatal dev-only error
      console.warn('Could not install devtools:', e && e.message ? e.message : e);
    });
  }
  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    // In production load the built React app
    win.loadFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
  }

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(() => {
  startPython();
  // If running in dev, dynamically require the devtools installer package
  // so production doesn't need this dependency.
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
      installDevtools = async () => {
        await installExtension(REACT_DEVELOPER_TOOLS);
        console.log('React DevTools installed');
      };
    } catch (e) {
      // electron-devtools-installer is not available; skip silently.
      installDevtools = async () => {};
    }
  }
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => {
  if (pyProc) pyProc.kill();
});
