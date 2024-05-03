import { BrowserWindow, ipcMain, app } from 'electron';
import betterCopy from '../scripts/betterCopy';

// 监听 LL_GKDInspectForQQNT.openInspectWindow 频道，获取携带的快照链接
ipcMain.on('LL_GKDInspectForQQNT.openInspectWindow', (e, url: string) => {
  // 创建一个新窗口
  const inspectWindow = new BrowserWindow({
    height: 1080, // 窗口高度
    width: 1920, // 窗口宽度
    autoHideMenuBar: true, // 关闭默认显示菜单
  });
  inspectWindow.loadURL(url); // 加载快照链接
  inspectWindow.webContents.executeJavaScript(betterCopy); // 注入复制增强脚本
  inspectWindow.show(); // 显示窗口

  // 当 inspectWindow 创建新窗口时触发
  inspectWindow.webContents.setWindowOpenHandler((details) => {
    if(details.url){
      const newWindow = new BrowserWindow({
        height: 1080, // 窗口高度
        width: 1920, // 窗口宽度
        autoHideMenuBar: true, // 关闭默认显示菜单
      });
      newWindow.loadURL(details.url);
      if(details.url.startsWith('https://i.gkd.li')) newWindow.webContents.executeJavaScript(betterCopy);
      newWindow.show();
    }
    // 禁止创建新窗口
    return {
      action: 'deny',
    }
  });
});

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[GKD网页审查工具 for QQNT] 窗口已创建');
  console.log(window);
};