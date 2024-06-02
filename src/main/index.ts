import { BrowserWindow, ipcMain, app } from 'electron';
import betterCopy from '../scripts/betterCopy';
import { ISnapshotCollection } from '../config/snapshotCollection';
import fs from 'node:fs';

// 判断是否存在数据文件夹
if(!fs.existsSync(LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data)){
  // 若无，则创建
  fs.mkdir(LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data, (err) => {
    if(err) throw err;
  });
}
// 复制网页文件到data
fs.copyFileSync(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.plugin}/pages/detail.html`, `${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/index.html`);
fs.copyFileSync(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.plugin}/scripts/detailScript.js`, `${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/index.js`);

// 监听 LL_GKDInspectForQQNT.openInspectWindow 频道，获取携带的快照链接
ipcMain.on('LL_GKDInspectForQQNT.openInspectWindow', (_, url: string) => {
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

ipcMain.on('LL_GKDInspectForQQNT.openDetailWindow', () => {
  // 创建一个新窗口
  const detailWindow = new BrowserWindow({
    height: 1080, // 窗口高度
    width: 1920, // 窗口宽度
    autoHideMenuBar: true, // 关闭默认显示菜单
  });
  detailWindow.loadFile(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/index.html`);
  detailWindow.show(); // 显示窗口

  // 当 detailWindow 创建新窗口时触发
  detailWindow.webContents.setWindowOpenHandler((details) => {
    if(details.url){
      // 如果创建的是 网页审查工具
      if(details.url.startsWith('https://i.gkd.li')){
        const newWindow = new BrowserWindow({
          height: 1080, // 窗口高度
          width: 1920, // 窗口宽度
          autoHideMenuBar: true, // 关闭默认显示菜单
        });
        newWindow.loadURL(details.url);
        // 需要特别注入复制增强脚本
        newWindow.webContents.executeJavaScript(betterCopy);
        newWindow.show();
      }
      // 如果是快照收集页更改状态请求
      if(details.url.endsWith('status')){
        const splitedUrl = details.url.split('/');
        const statusNumberMap = ['未适配', '已适配', '无activityId', '现有规则有效', '无法适配', '不予适配'];
        fs.readFile(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/config.json`, (err, data) => {
          if(err) throw err;

          // 变更状态并写入文件
          const hasStoredSnapshotUrls: ISnapshotCollection = JSON.parse(data.toString('utf-8'));
          (hasStoredSnapshotUrls.data[Number(splitedUrl[splitedUrl.length - 3])].status as string) = statusNumberMap[Number(splitedUrl[splitedUrl.length - 2])];
          fs.writeFile(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/config.json`, JSON.stringify(hasStoredSnapshotUrls), (err) => {
            if(err) throw err;
            detailWindow.loadFile(`${LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.path.data}/index.html`);
            detailWindow.show();
          });
        });
        // 禁止打开新窗口
        return {
          action: 'deny',
        };
      }
      // 不符合上述情况，正常打开新窗口
      else{
        const newWindow = new BrowserWindow({
          height: 1080, // 窗口高度
          width: 1920, // 窗口宽度
          autoHideMenuBar: true, // 关闭默认显示菜单
        });
        newWindow.loadURL(details.url);
        newWindow.show();
      }
    }
    // 禁止创建新窗口
    return {
      action: 'deny',
    }
  });
});

app.whenReady().then(async () => {
  const isHaveUpdate = await LiteLoader.api.checkUpdate('LiteLoaderQQNT_GKDInspectForQQNT');
  if(isHaveUpdate){
    const updateResult = await LiteLoader.api.downloadUpdate('LiteLoaderQQNT_GKDInspectForQQNT');
    if(updateResult){
      LiteLoader.api.showRelaunchDialog('LiteLoaderQQNT_GKDInspectForQQNT', true);
    }
  }
});

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[GKD网页审查工具 for QQNT] 窗口已创建');
  console.log(window);
};