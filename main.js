const {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  clipboard,
} = require("electron");
const path = require("path");
const robot = require("robotjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+Alt+U", () => {
    // insert clipboard code here
    const character = "ü";
    clipboard.writeText(character);
    //simulate key press
    setTimeout(() => {
      robot.keyTap("v", "control");
    }, 150);
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
