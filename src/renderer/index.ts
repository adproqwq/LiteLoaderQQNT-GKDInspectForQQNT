import addInspectEntry from '../utils/addInspectEntry';
import settingsPage from '../pages/settings';
import { slug } from '../config/commonInfo';
import { snapshotCollections } from '../config/snapshotCollection';

// 当渲染进程窗口加载完成后触发
const onload = () => {
  addInspectEntry();
};
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  // 设置页的事件监听
  view.innerHTML = settingsPage;

  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = globalThis.LiteLoader.plugins.LiteLoaderQQNT_GKDInspectForQQNT.manifest.version;

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    globalThis.LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-GKDInspectForQQNT');
  });

  (view.querySelector('#detail') as HTMLButtonElement).addEventListener('click', () => {
    LL_GKDInspectForQQNT.openDetailWindow();
  });

  (view.querySelector('#cleanAllLinks') as HTMLButtonElement).addEventListener('click', async () => {
    await LiteLoader.api.config.set(slug, snapshotCollections);
  });
};