import addInspectEntry from '../utils/addInspectEntry';

const onload = () => {
  addInspectEntry();
  window.addEventListener('inspectOpen', (e) => {
    console.log((e as CustomEvent).detail.link);
    LL_GKDInspectForQQNT.openWindow((e as CustomEvent).detail.link);
  });
};
onload();