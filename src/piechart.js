
function drawPie(ctx, r, angles, colors, zoomIndex) {
    let centerPoint = [ctx.width/2, ctx.height/2];
    let rotate = 0;
    for(let i = 0; i < angles.length; i++) {
      ctx.save();
      ctx.translate(centerPoint[0], centerPoint[1]);
      ctx.fillStyle = colors[i];
      ctx.strokeStyle = colors[i];
      ctx.beginPath();
      ctx.moveTo(0,0);

      if (i === zoomIndex) {
        ctx.arc(0, 0, r + 10, rotate, rotate + angles[i]);
      } else {
        ctx.arc(0, 0, r, rotate, rotate + angles[i]);
      }
      rotate += angles[i];
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
}

function createPie(ctx, options) {
  let nums = options.nums;
  let colors = options.colors;
  let sum = nums.reduce(function(preValue, curValue) {
    return preValue + curValue;
  });
  let r = ctx.width > ctx.height ? ctx.height/2 - 20 : ctx.width/2 - 20;  
  //计算每个扇形角度
  let angles = [];
  nums.map(item => {
    angles.push(item/sum*2*Math.PI);
  });
  drawPie(ctx, r, angles, colors, -1);
  let centerPoint = [ctx.width/2, ctx.height/2];
  let mousein = false;
  ctx.addEvent('mousemove', (event) => {
    if (mousein) {
      setTimeout(() => {
        mousein = false;
      }, 50);
      return;
    } else {
      mousein = true;
    }
    let point = {
      x: event.offsetX - centerPoint[0], 
      y:event.offsetY - centerPoint[1]
    }
    if (containPoint(point, r, 0,  2*Math.PI)) {
      let angleSum = 0;
      for(let i = 0; i < angles.length; i++) {
        if (containPoint(point, r, angleSum, angleSum+angles[i])) {
          ctx.clearRect(0, 0, ctx.width, ctx.height);
          drawPie(ctx, r, angles, colors, i);
          break;
        }
        angleSum += angles[i];
        if (i == angles.length - 1) {
          ctx.clearRect(0, 0, ctx.width, ctx.height);
          drawPie(ctx, r, angles, colors, -1);
        }
      } 
    } else {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      drawPie(ctx, r, angles, colors, -1);
    }
  });
  ctx.addEvent('mouseout', (event) => {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    drawPie(ctx, r, angles, colors, -1);
  });
}


//圆心默认(0,0)
function containPoint(point, r, startAngle, endAngle) {
  if (Math.sqrt(point.x*point.x + point.y*point.y) <= r){
    let arcSin = Math.asin(point.y/r);
    let angle = 0;
    if (point.x < 0 && point.y >= 0) {
      angle = Math.PI - arcSin;
    } else if (point.x < 0 && point.y < 0){
      angle = Math.PI - arcSin;
    } else if (point.x >= 0 && point.y < 0) {
      angle = 2*Math.PI + arcSin;
    } else {
      angle = angle;
    }
    if (angle>= startAngle && angle < endAngle) {
      return true;
    }
  }
  return false;
}

export {
  createPie
}