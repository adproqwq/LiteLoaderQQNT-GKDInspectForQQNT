import { contextBridge, ipcRenderer } from 'electron';

// 主进程与渲染进程通信
contextBridge.exposeInMainWorld('LL_GKDInspectForQQNT', {
  openInspectWindow: (url: string) => {
    // 当渲染进程调用 LL_GKDInspectForQQNT.openInspectWindow 函数时，将链接传递到 LL_GKDInspectForQQNT.openInspectWindow 频道中
    ipcRenderer.send('LL_GKDInspectForQQNT.openInspectWindow', url);
  },
  openDetailWindow: () => {
    ipcRenderer.send('LL_GKDInspectForQQNT.openDetailWindow');
  },
});