import { contextBridge, ipcRenderer } from 'electron';

// 主进程与渲染进程通信
contextBridge.exposeInMainWorld('LL_GKDInspectForQQNT', {
  openWindow: (snapshotUrl: string) => {
    // 当渲染进程调用 LL_GKDInspectForQQNT.openWindow 函数时，将快照链接传递到 LL_GKDInspectForQQNT.openWindow 频道中
    ipcRenderer.send('LL_GKDInspectForQQNT.openWindow', snapshotUrl);
  }
});