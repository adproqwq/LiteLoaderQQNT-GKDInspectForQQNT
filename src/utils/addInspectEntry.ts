import { ISnapshotCollection, snapshotCollections } from '../config/snapshotCollection';
import { slug } from '../config/commonInfo';

export default () => {
  // 循环检测，每秒一次
  setInterval(() => {
    // 获取链接的消息元素
    document.querySelectorAll('.text-link').forEach(async (e) => {
      // 判断链接是否为快照链接
      if((e as HTMLSpanElement).innerText.startsWith('https://i.gkd.li/i')){
        // 判断该快照链接是否被收集，如果未收集，则收集
        const hasStoredSnapshotUrls: ISnapshotCollection = await LiteLoader.api.config.get(slug, snapshotCollections);
        if(hasStoredSnapshotUrls.snapshotUrls.indexOf((e as HTMLSpanElement).innerText) == -1){
          hasStoredSnapshotUrls.snapshotUrls.push((e as HTMLSpanElement).innerText);
          hasStoredSnapshotUrls.data.push({
            snapshotUrl: (e as HTMLSpanElement).innerText,
            status: '未适配',
          });
          await LiteLoader.api.config.set(slug, hasStoredSnapshotUrls);
        }
        // 判断是否已添加过 审查 按钮
        if((e as HTMLSpanElement).nextElementSibling?.id !== 'inspectEntry'){
          // 配置按钮属性
          const entryButton = document.createElement('button');
          entryButton.id = 'inspectEntry';
          entryButton.innerText = '审查';
          entryButton.setAttribute('data-link', (e as HTMLSpanElement).innerText);
          // 将按钮插入至链接之后
          (e as HTMLSpanElement).insertAdjacentElement('afterend', entryButton);
        }
      }
    });
    // 获取文件的消息元素
    document.querySelectorAll('.file-message--content').forEach((e) => {
      // 判断是否已添加过 上传 按钮
      if((e as HTMLDivElement).nextElementSibling?.id !== 'inspectEntry'){
        // 配置按钮属性
        const entryButton = document.createElement('button');
        entryButton.id = 'inspectEntry';
        entryButton.innerText = '上传';
        entryButton.setAttribute('data-link', 'https://i.gkd.li');
        // 将按钮插入至链接之后
        (e as HTMLSpanElement).insertAdjacentElement('afterend', entryButton);
      }
    });
    // 监听 审查/上传 按钮按下
    document.querySelectorAll('#inspectEntry').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        LL_GKDInspectForQQNT.openInspectWindow((b as HTMLButtonElement).getAttribute('data-link')!);
      };
    });
  }, 1000);
};