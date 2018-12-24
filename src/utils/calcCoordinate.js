//angle为角度
function calcCircleXY(x, y, r, angle) {
  let resX = x + r*Math.cos(angle);
  let resY = x + r*Math.sin(angle);
  return {
    x: resX,
    y: resY
  }
}

//num为角度数字
function calcCircleXYByNum(x, y, r, num) {
  let angle = num%180*Math.PI;
  return calcCircleXY(x, y, r, angle);
}

export {
  calcCircleXY,
  calcCircleXYByNum
}