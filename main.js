const {
  app,
  BrowserWindow,
  globalShortcut,
  clipboard,
  Menu,
  Tray,
  nativeImage,
} = require("electron");
const path = require("path");
const robot = require("robotjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

function createTrayIcon() {
  // if icon tray seems to disappear in the future
  // you probably have to give it a "let" variable
  // in the global scope, so it isn't garbage
  // collected
  const iconPath = path.join(__dirname, "16.png");
  appIcon = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Window",
      click: () => {
        createWindow();
        appIcon.destroy();
      },
    },
    {
      label: "Quit Akzent",
      click: () => {
        app.quit();
      },
    },
  ]);

  appIcon.setToolTip("Keyboard Accent Tray Context");
  appIcon.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  // createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  createTrayIcon();
});

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+Alt+U", () => {
    // insert clipboard code here
    const character = "ü";
    clipboard.writeText(character);
    //simulate key press
    setTimeout(() => {
      robot.keyTap("v", "control");
    }, 200);
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  //make so tray icon is displayed again
  createTrayIcon();
});
