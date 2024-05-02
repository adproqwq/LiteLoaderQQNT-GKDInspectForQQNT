import { inspectOpenEvent } from './inspectEvent';

export default () => {
  // 循环检测，每秒一次
  setInterval(() => {
    // 获取链接的消息元素
    document.querySelectorAll('.text-link').forEach((e) => {
      // 判断链接是否为快照链接
      if((e as HTMLSpanElement).innerText.startsWith('https://i.gkd.li/i')){
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
    // 监听 审查 按钮按下
    document.querySelectorAll('#inspectEntry').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        // 将快照链接存入自定义事件携带的参数中
        inspectOpenEvent.detail.link = (b as HTMLButtonElement).getAttribute('data-link')!;
        // 触发自定义事件
        window.dispatchEvent(inspectOpenEvent);
      };
    });
  }, 1000);
};