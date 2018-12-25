import {calcCircleXY, calcCircleXYByNum } from './utils/calcCoordinate';
import {addLine, addRect, addSector, addSectorNoBk} from './tools/basicGraph';
import {createPie} from './piechart';
import {addEvent, bindEvent} from './event/event';

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
    bindEvent(this.dom);
    let canvas = document.createElement('canvas');
    canvas.width = this.dom.offsetWidth;
    canvas.height = this.dom.offsetHeight;
    this.dom.appendChild(canvas);
    this.instance = canvas;
    if (this.instance) {
      this.ctx = this.instance.getContext('2d');
      this.ctx.width = this.dom.offsetWidth;
      this.ctx.height = this.dom.offsetHeight;
      this.ctx.addEvent = addEvent;
    }
  }

  //设置背景色
  setBackground(color) {
    this.instance.style.background = color;
  }
  
  //画矩形
  addRect(options) {
    addRect(this.ctx, options);
  }

  addLine(options) {
    addLine(this.ctx, options);
  }

  addSector(options) {
    addSector(this.ctx, options);
  }

  addSectorNoBk(options) {
    addSectorNoBk(this.ctx, options);
  }

  addPie(options){
    createPie(this.ctx, options)
  }
}

function init(id) {
  let ins = new xcharts(id);
  return ins;
}

export {
  init
}

export default {
  init
}