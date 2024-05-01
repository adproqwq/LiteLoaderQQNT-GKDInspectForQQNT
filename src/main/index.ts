import { BrowserWindow, ipcMain } from 'electron';
import betterCopy from '../scripts/betterCopy';

ipcMain.on('LL_GKDInspectForQQNT.openWindow', (e, snapshotUrl: string) => {
  const mainWindow = new BrowserWindow({
    height: 1080,
    width: 1920,
    autoHideMenuBar: true,
  });
  mainWindow.loadURL(snapshotUrl);
  mainWindow.webContents.executeJavaScript(betterCopy);
  mainWindow.show();
});

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[GKD网页审查工具 for QQNT] 窗口已创建');
  console.log(window);
};