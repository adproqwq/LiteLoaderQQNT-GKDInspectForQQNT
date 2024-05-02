import { BrowserWindow, ipcMain } from 'electron';
import betterCopy from '../scripts/betterCopy';

// 监听 LL_GKDInspectForQQNT.openWindow 频道，获取携带的快照链接
ipcMain.on('LL_GKDInspectForQQNT.openWindow', (e, snapshotUrl: string) => {
  // 创建一个新窗口
  const mainWindow = new BrowserWindow({
    height: 1080, // 窗口高度
    width: 1920, // 窗口宽度
    autoHideMenuBar: true, // 关闭默认显示菜单
  });
  mainWindow.loadURL(snapshotUrl); // 加载快照链接
  mainWindow.webContents.executeJavaScript(betterCopy); // 注入复制增强脚本
  mainWindow.show(); // 显示窗口
});

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[GKD网页审查工具 for QQNT] 窗口已创建');
  console.log(window);
};