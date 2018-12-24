import {calcCircleXY, calcCircleXYByNum }from './utils/calcCoordinate'

class xcharts {
  constructor(id) {
    this._id = id;
    this.instance = null;
    this.ctx = null;
    this.addCanvas(id);
  }

  //添加canvas节点
  addCanvas(id) {
    this.dom = document.getElementById(id);
    if (!this.dom) {
      console.error(`can not find the dom that id is ${id}`);
    }
    let canvas = document.createElement('canvas');
    canvas.width = this.dom.offsetWidth;
    canvas.height = this.dom.offsetHeight;
    //canvas.style.width = '100%';
    //canvas.style.height = '100%';
    this.dom.appendChild(canvas);
    this.instance = canvas;
    if (this.instance) {
      this.ctx = this.instance.getContext('2d');
    }
  }

  //设置背景色
  setBackground(color) {
    this.instance.style.background = color;
  }
  
  //画矩形
  addRect(options) {
    this.ctx.fillStyle=options.bkColor;
    this.ctx.strokeStyle=options.borderColor;
    //this.ctx.fillRect(x,y,width,height);
    this.ctx.strokeRect(options.x,options.y,options.width,options.height);
    this.ctx.font=options.font;
    this.ctx.fillText('this is text', options.x + 10, options.y + 10);
  }

  addLine(options) {
    this.ctx.strokeStyle=options.borderColor;
    this.ctx.beginPath();
    this.ctx.moveTo(options.startX,options.startY);
    this.ctx.lineTo(options.endX,options.endY);
    this.ctx.stroke();
  }

  addSector(options) {
    this.ctx.strokeStyle=options.borderColor;
    this.ctx.beginPath();
    this.ctx.arc(options.x,options.y, options.r, options.rotate, options.rotate + options.size);
    this.ctx.moveTo(options.x, options.y);
    let start = calcCircleXY(options.x,options.y, options.r, options.rotate);
    this.ctx.lineTo(start.x,start.y);
    this.ctx.moveTo(options.x, options.y);
    let end = calcCircleXY(options.x,options.y, options.r, options.rotate + options.size);
    this.ctx.lineTo(end.x,end.y);
    this.ctx.stroke();
  }
}

function init(id) {
  let ins = new xcharts(id);
  return ins;
}

export {
  init
}