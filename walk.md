## canvas实现 行人 走路的动画
先看下效果，然后再说如何实现，最终效果如下：<br>
<img src="./walk.gif"><br>
我们知道动画其实是不同的图片循环替换，造成视觉上图片在动。<br>
我们制作这个动画的素材如下：<br>
<img src="./walk.jpg"><br>
从右至左，就是一个人的行走的所有动作，抬腿，迈步,脚落下，另一只脚迈步，然后循环如此。<br>
我们将图中的五个动作图截出来，循环播放，效果就如下：<br>
<img src="./walkNoOffset.gif"><br>
可以看出，这是一个原地踏步的动作，如果给图片加上位移，就是行走的效果。<br>
这里讲一个知识点:**Css spirit**。<br>
我们刚刚已经讲了，动画是5个动作的合成，应该有5张图片，现在我们将5张图片放在一张图片里，需要时截取图片的部分，就可以获取所需实际图片了。<br>
这么做的原因是：<br>
**在实际的web应用中，页面上可能有上百张甚至好几百张图片，如果每张图片都是单独的，就需要建立几百个http连接，每个连接的建立都需要耗费一定时间，几个个连接的时间浪费是非常大的。我们可以把多张图片合成到一张大的图片中，然后通过CSS中的背景定位等技术，把背景定位到实际的图片位置，就可以得到所需图片了（canvas也可以利用这种思想）。这样可以节省大量的连接建立时间。是前端优化的一部分。**<br>
当然，现在我们使用各种工具构建前端工程，打包时会将很多小图标直接转成BASE64编码。
(例如，webpack, 使用url-loader插件，设置limit，打包时，将所有小于limit的图片进行BASE64编码)。<br>
源码如下:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>walk</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <canvas width="500" height="400" id="canvas" style="margin-top: 200px;"></canvas>
  <img src="../asserts/walk.jpg" style="display: none;" id="walk">
  <script>
    //获取图片
    let walkImg = document.getElementById('walk'); 
    //获取绘图上下文
    let ctx = document.getElementById('canvas').getContext('2d');
    
    //这个参数是用来标识，现在改用哪个用作，初始值是4，图片最有边的动作，开始行走的动作。取值是4~0，循环
    let index = 4;

    //行走位置
    let position = 0;
    
    //行走的方向，true代表从左至右， false代表从右至左
    let direct = true;

    //定时器，确保图片加载完成再绘制动画
    let timer = null;
    //确保图片加载完成再绘制到
    if (!walkImg.complete) {
      timer = setInterval(() => {
        //两张图片加载完成
        if (walkImg.complete) {
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
      //画脚下的线，当做地面
      addLawn();
      //添加初始动作
      addWalk();
      //使用定时器，不断重绘画面，形成动画
      setInterval(() => {
        ctx.clearRect(0, 0, 500, 400);
        addLawn();
        addWalk();
      }, 150);
    }

    //绘制线段，当做地面
     function addLawn() {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 3;
      ctx.moveTo(0, 112);
      ctx.lineTo(500, 112);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
     }

     //添加不同位置图片
     function addWalk() {
      ctx.save();
      /**
       * 行走分为两个方向，从左至右和从右至左，我们分别说明
       * 1、从右至左：图片资源的5个动作就是从右至左方向走的，所以从右至左行走时，无需
       * 额外处理图片，只需将对应动作放在规定位置即可。
       * 
       * 2、从左至右：这与图片资源的工作方向相反，所以，提取动作后，需要翻转（利用scale进行翻转）。
       * */

      if (direct) {
        //从左至右方向，scale(-1, 1)先翻转画布，然后利用translate修改坐标系原点
        ctx.scale(-1, 1);
        ctx.translate(-position-55,0);
        position += 6;
      } else {
        //从右至左方向，无需翻转，只需修改坐标系原点，然后将图片直接从原点处放置即可
        ctx.translate(position,0);
        position -= 6;
      }
      //根据index不同，从图片资源中提取不同的行走动作
      switch(index) {
        case 0:
          ctx.drawImage(walkImg, 0, 0, 55, 110, 0, 0, 55, 110);
          break;
        case 1:
          ctx.drawImage(walkImg, 75, 0, 55, 110, 0, 0, 55, 110);
          break;
        case 2:
          ctx.drawImage(walkImg, 145, 0, 55, 110, 0, 0, 55, 110);
          break;
        case 3:
          ctx.drawImage(walkImg, 220, 0, 55, 110, 0, 0, 55, 110);
          break;
        case 4:
          ctx.drawImage(walkImg, 270, 0, 55, 110, 0, 0, 55, 110);
          break;
      }
      
      //图片位置，走到这返回
      if (position > 440) {
        direct = false;
      } 
      if (position < 10) {
        direct = true;
      }

      index -=1 ;
      if (index < 0) {
        index = 4;
      }
      ctx.restore();
    }
  </script>
</body>
</html>
```
 