
/**
 * 通用
 */

/**
 * 防抖函数 , 防抖函数只执行一次，后面执行的都是其返回的函数
 */
export function debounce(func, timeSpan) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, timeSpan)
  }
}

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt){
  //1.获取年份
  //y
  //y+ 1个或者多个y
  //y* 0个或多个
  //y? 0个或多个

  //fmg中的y个数不一定
  //yy时：  fmt.replace('yy', '2019'.substr(4-2))
  //yyy时：  fmt.replace('yyy', '2019'.substr(4-3))
  //获取年份
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}