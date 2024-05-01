import { inspectOpenEvent } from './inspectEvent';

export default () => {
  setInterval(() => {
    document.querySelectorAll('.text-link').forEach((e) => {
      if((e as HTMLSpanElement).innerText.startsWith('https://i.gkd.li/i')){
        if((e as HTMLSpanElement).nextElementSibling?.id !== 'inspectEntry'){
          const entryButton = document.createElement('button');
          entryButton.id = 'inspectEntry';
          entryButton.innerText = '审查';
          entryButton.setAttribute('data-link', (e as HTMLSpanElement).innerText);
          (e as HTMLSpanElement).insertAdjacentElement('afterend', entryButton);
        }
      }
    });
    document.querySelectorAll('#inspectEntry').forEach((b) => {
      (b as HTMLButtonElement).onclick = () => {
        inspectOpenEvent.detail.link = (b as HTMLButtonElement).getAttribute('data-link')!;
        window.dispatchEvent(inspectOpenEvent);
      };
    });
  }, 1000);
};