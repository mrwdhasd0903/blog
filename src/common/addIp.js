//给所有图片添加前缀
export function addIp() {
  setTimeout(() => {
    let aImgs = document.getElementsByTagName("img");
    for (let i = 0; i < aImgs.length; i++) {
      aImgs[i].src =
        "http://47.113.92.137/" + aImgs[i].getAttribute("src");
    }
  });
}
