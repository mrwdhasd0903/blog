export function getColor(n = 100) {
  //补齐值
  const c = 256 - n;
  const r = Math.floor(Math.random() * n + c);
  const g = Math.floor(Math.random() * n + c);
  const b = Math.floor(Math.random() * n + c);
  return "rgb(" + r + "," + g + "," + b + ")"
}
