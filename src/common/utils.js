
/**
 * 通用
 */
//防抖函数
export function debounce(func, timeSpan) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, timeSpan)
  }
}