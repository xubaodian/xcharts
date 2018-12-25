import {calcCircleXY, calcCircleXYByNum }from '../utils/calcCoordinate'

//矩形
function addRect(ctx, options) {
  ctx.save();
  ctx.fillStyle=options.bkColor;
  ctx.strokeStyle=options.borderColor;
  //ctx.fillRect(x,y,width,height);
  ctx.strokeRect(options.x,options.y,options.width,options.height);
  ctx.font=options.font;
  ctx.fillText(options.text || '', options.x + 10, options.y + 10);
  ctx.restore();
}

//线
function addLine(ctx, options) {
  ctx.save();
  ctx.strokeStyle=options.borderColor;
  ctx.beginPath();
  ctx.moveTo(options.startX,options.startY);
  ctx.lineTo(options.endX,options.endY);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

//扇形
function addSector(ctx, options) {
  ctx.save();
  ctx.strokeStyle=options.borderColor;
  ctx.fillStyle=options.bkColor;
  ctx.beginPath();
  ctx.moveTo(options.x, options.y);
  ctx.arc(options.x,options.y, options.r, options.rotate, options.rotate + options.size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function addSectorNoBk(ctx,options) {
  ctx.save();
  ctx.translate(options.x, options.y);
  ctx.rotate(options.rotate);
  ctx.moveTo(options.r, 0);
  ctx.arc(0,0,options.r, 0, options.size);
  ctx.restore();
  //第一条线
  ctx.save();
  ctx.translate(options.x, options.y);
  ctx.moveTo(0, 0);
  ctx.rotate(options.rotate);
  ctx.lineTo(options.r, 0);
  ctx.restore();
  // //第二条线
  ctx.save();
  ctx.translate(options.x, options.y);
  ctx.moveTo(0,0);
  ctx.rotate(options.rotate + options.size);
  ctx.lineTo(options.r,0);
  ctx.restore();
  ctx.stroke();
}

//圆
function addCircle(ctx, options) {
  ctx.save();
  ctx.strokeStyle=options.borderColor;
  ctx.fillStyle=options.bkColor;
  ctx.arc(options.x,options.y, options.r, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

export {
  addRect,
  addLine,
  addSector,
  addCircle,
  addSectorNoBk
}