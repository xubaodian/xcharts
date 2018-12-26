//向canvas绘制图片
export function setBkImg(ctx, img) {
  ctx.save();
  ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
  img.onload = () => {
    ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
  };
  ctx.restore();
}

/**
 * 介绍下getImageData()函数的返回值imageData
 * imageData.data存储着一下四种信息
 * R - 红色 (0-255)
 * G - 绿色 (0-255)
 * B - 蓝色 (0-255)
 * A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)，
 * 所以，获取第一个元素的R G B A，分别为imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3]
 */

//反色效果
export function setImgInvert(ctx, x, y, width, height){
  ctx.save();
  let imageData = ctx.getImageData(x, y, width, height);
  let imageData_length = imageData.data.length / 4;
  // 解析之后进行算法运算
  for (var i = 0; i < imageData_length; i++) {
      imageData.data[i * 4] = 255 - imageData.data[i * 4];
      imageData.data[i * 4 + 1] = 255 - imageData.data[i * 4 + 1];
      imageData.data[i * 4 + 2] = 255 - imageData.data[i * 4 + 2];
  }
  ctx.putImageData(imageData, x, y);
  ctx.restore();
}

//设置透明度
export function setImgAlpha(ctx, x, y, width, height, alpha){
  ctx.save();
  let imageData = ctx.getImageData(x, y, width, height);
  let imageData_length = imageData.data.length / 4;
  // 解析之后进行算法运算
  for (var i = 0; i < imageData_length; i++) {
      imageData.data[i * 4 + 3] = alpha * 255;
  }
  ctx.putImageData(imageData, 0, 0);
  ctx.restore();
}