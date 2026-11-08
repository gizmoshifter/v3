// Electron Main process for Onyx 3.0 on Windows 11
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1080,
    minHeight: 700,
    backgroundColor: '#05070d',
    title: 'Onyx 3.0 - League of Legends Companion',
    frame: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#080c16',
      symbolColor: '#f43f5e',
      height: 38,
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'public/favicon.ico'),
  });

  const url = process.env.APP_URL || 'http://localhost:3000';
  win.loadURL(url);

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
