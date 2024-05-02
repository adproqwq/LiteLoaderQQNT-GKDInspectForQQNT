import addInspectEntry from '../utils/addInspectEntry';

// 当渲染进程窗口加载完成后触发
const onload = () => {
  addInspectEntry();
  // 监听 inspectOpen 自定义事件
  window.addEventListener('inspectOpen', (e) => {
    // 当监听到 inspectOpen 事件，调用 LL_GKDInspectForQQNT.openWindow 传递快照链接
    LL_GKDInspectForQQNT.openWindow((e as CustomEvent).detail.link);
  });
};
onload();