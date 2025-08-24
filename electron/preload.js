const { contextBridge } = require("electron");

// expose a tiny API if you later need secure main<->renderer comms
contextBridge.exposeInMainWorld("api", {
  ping: () => "pong",
});
