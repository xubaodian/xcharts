## Canvas实现几个图标绕某个中心旋转
前几天看到一个动画是几个图标围着一个中心旋转，正好最近，就思考用canvas如何实现。先看下实现效果.<br>
<img src="./rotate.gif"><br>
中间一个楼房，几个红点围绕着楼房旋转。<br>
整个图片可以分为几个部分：<br>
1、楼房<br>
2、椭圆<br>
3、旋转的原点<br>
可以看到，楼房和椭圆是固定的，只有原点在动。那么，我们可以分几步实现该效果，如下：<br>
1、在canvas上添加楼房。<br>
2、添加椭圆。<br>
3、添加红色的圆圈。<br>
如果要让红圈动起来，可以如下操作：<br>
**每隔一段时间重新绘制canvas**<br>
代码如下，代码中有注释，对canvas稍有基础都能看的懂。
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <canvas width="500" height="400" id="canvas"></canvas>
  <img src="../asserts/room.jpg" style="display: none" id="room">
  <script>
    let roomImg = document.getElementById('room'); 
    let timer = null;
    //旋转的角度
    let startAngle = 0;

    //确保图片加载完成再绘制到
    if (!roomImg.complete) {
      //用定时器检查图片是否绘制完成
      timer = setInterval(() => {
        //两张图片加载完成
        if (roomImg.complete) {
          //清除定时器
          clearInterval(timer);
          timer = null;
          //绘制
          drawAll();
        }
      }, 200);
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
  
    //获取绘图上下文
    let ctx = document.getElementById('canvas').getContext('2d');
   
    //添加楼房背景
    function addBk() {
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.drawImage(roomImg, 0, 0, 500, 400);
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
  </script>
</body>
</html>
```
