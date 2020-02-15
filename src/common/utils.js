//防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
//判断筛选的标签是否可以提交
export function isObjectValueEqual(a, b) {
  for (let i in a) {
    if (a[i].c != b[i].c) {
      return true
    }
  }
  return false
}
