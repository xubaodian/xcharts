import bgImg from '../../asserts/room.jpg';
import serverImg from '../../asserts/server.jpg';
import { setBkImg, setImgInvert, setImgAlpha} from '../../src/Image/graphicTools'

let startAngle = 0;

let bkImg = new Image();
bkImg.src = bgImg;

let servImg = new Image();
servImg.src = serverImg;

//
let dom = document.getElementById('app');
let ctx = addCanvas(dom);

//按钮事件
document.getElementById('addBk').onclick = () => {
  setBkImg(ctx, bkImg);
  drawEllipse(ctx, 4);
  setInterval(() => {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    startAngle += 0.01*Math.PI;
    if (startAngle > 2*Math.PI) {
      startAngle -= 2*Math.PI;
    }
    setBkImg(ctx, bkImg);
    drawEllipse(ctx, 5);
  }, 100);
}

function addCanvas(dom) {
  let canvas = document.createElement('canvas');
  canvas.width = dom.offsetWidth;
  canvas.height = dom.offsetHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  dom.appendChild(canvas);
  let ctx = canvas.getContext('2d');
  ctx.width = dom.offsetWidth;
  ctx.height = dom.offsetHeight;
  return ctx;
}


function drawEllipse(ctx, len) {
  ctx.save();
  ctx.translate(240, 340);
  ctx.stokeStyle = '#000';
  ctx.globalAlpha = 1;
  ctx.scale(1, 0.2);
  ctx.arc(0, 0, 200, 0, 2*Math.PI);
  ctx.stroke();
  let averAngle = 2*Math.PI/len;
  //添加旋转图标
  for (let i = 0; i < len; i++) {
    let angle = startAngle + i * averAngle;
    if (angle > 2*Math.PI) {
      angle -= 2*Math.PI;
    }
    let x = 0, y =0;
    x = 200*Math.cos(angle);
    y = 200*Math.sin(angle);
    ctx.drawImage(servImg, x - 20, y - 5*30, servImg.width, 5*servImg.height); 
  }
  ctx.restore();
}