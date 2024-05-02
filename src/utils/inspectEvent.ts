// 注册 inspectOpen 自定义事件
export const inspectOpenEvent = new CustomEvent('inspectOpen', {
  // 触发该事件时携带的信息
  detail: {
    link: ''
  }
});