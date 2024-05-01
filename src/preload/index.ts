import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('LL_GKDInspectForQQNT', {
  openWindow: (snapshotUrl: string) => {
    ipcRenderer.send('LL_GKDInspectForQQNT.openWindow', snapshotUrl);
  }
});