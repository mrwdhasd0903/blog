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
//随机颜色生成
export function getColor(n = 100) {
  //补齐值
  const c = 256 - n;
  const r = Math.floor(Math.random() * n + c);
  const g = Math.floor(Math.random() * n + c);
  const b = Math.floor(Math.random() * n + c);
  return "rgb(" + r + "," + g + "," + b + ")"
}

// 图片点击放大
export function imgAmp(Class) {
  let aImgs = document.getElementsByClassName(Class)[0].getElementsByTagName("img");
  setTimeout(() => {
    let parser = new DOMParser();
    document.body.appendChild(parser.parseFromString(
      `<div id="imgamp" class="el-loading-mask is-fullscreen" style="
    background-color: rgba(0, 0, 0, 0.1);
    top:0;
    display:none
    "></div>`, "text/html").getElementsByTagName('div')[0]);
    let imgamp = document.getElementById("imgamp");
    for (let item of aImgs)
      item.addEventListener("click", () => {
        imgamp.appendChild(item.cloneNode());
        imgamp.style.display = 'block';
      });

    imgamp.addEventListener("click", () => {
      imgamp.style.display = 'none';
      var childs = imgamp.childNodes;
      for (var i = childs.length - 1; i >= 0; i--) {
        imgamp.removeChild(childs[i]);
      }
    })
  })
}
