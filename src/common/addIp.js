//给所有图片添加前缀
const URL = "http://admin.wdhhh.cn"
export function addIp(Class) {
  setTimeout(() => {
    let aImgs = document.getElementsByClassName(Class)[0].getElementsByTagName("img");
    for (let i = 0; i < aImgs.length; i++) {
      aImgs[i].src =
        "http://47.113.92.137:8888/" + aImgs[i].getAttribute("src");
    }
  });
}
export function getURL() {
  return URL
}
