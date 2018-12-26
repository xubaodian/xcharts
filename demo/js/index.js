import roomImg from '../../asserts/room.jpg'; 
//获取绘图上下文
let ctx = document.getElementById('canvas').getContext('2d');
let bkimg = new Image();
bkimg.src = roomImg;
let timer = null;
//旋转的角度
let startAngle = 0;
//确保图片加载完成再绘制到
if (!bkimg.complete) {
 //用定时器检查图片是否绘制完成
  timer = setInterval(() => {
    //两张图片加载完成
    if (bkimg.complete) {
       //清除定时器
      clearInterval(timer);
      timer = null;
      //绘制
      drawAll();
    }
  }, 200);
} else {
  drawAll();
}


    function drawAll() {
      //清除原来的图层
      ctx.clearRect(0, 0, 500, 400);
      addBk();
      drawEllipse();
      drawRotateIcon(5);
      startAngle += 0.004*Math.PI;
        if (startAngle > 2*Math.PI) {
          startAngle -= 2*Math.PI;
        }
      //不断重新绘制旋转图标的位置,使用此函数代替定时器
      requestAnimationFrame(() => {
        drawAll();
      });
    }
   
    //添加楼房背景
    function addBk() {
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.drawImage(bkimg, 0, 0, 500, 400);
      ctx.restore();
    }

    //画椭圆
    function drawEllipse() {
      ctx.save();
      ctx.translate(250, 260);
      ctx.beginPath();
      ctx.stokeStyle = '#A0A0A0';
      ctx.globalAlpha = 0.5;
      ctx.scale(1, 0.2);
      ctx.arc(0, 0, 200, 0, 2*Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    //画旋转的圆
    function drawRotateIcon(len) {
      ctx.save();
      ctx.translate(250, 260);
      ctx.fillStyle="red";
      let averAngle = 2*Math.PI/len;
      for (let i = 0; i < len; i++) {
        let angle = startAngle + i * averAngle;
        if (angle > 2*Math.PI) {
          angle -= 2*Math.PI;
        }
        if (angle < 1.65*Math.PI && angle > 1.3*Math.PI) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.8;
        }
        let x = 0, y =0;
        x = 200*Math.cos(angle);
        y = 0.2*200*Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2*Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        //若要绘制图片围着楼宇转，则在此处添加图片，如下
        //ctx.drawImage(rotateImg, x - 0.5*serverImg.width , y - 0.5*serverImg.height, serverImg.width, serverImg.height); 
      }
      ctx.restore();
    }