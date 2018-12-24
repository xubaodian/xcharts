class xcharts {
  constructor(id) {
    this._id = id;
    this.dom = document.getElementById(id);
    if (!this.dom) {
      console.error(`can not find the dom that id is ${id}`);
    }

    this.instance = null;
    this.ctx = null;
    this.addCanvas();
  }

  //添加canvas节点
  addCanvas() {
    let canvas = document.createElement('canvas');
    canvas.style.width = "100%";
    canvas.style.height = "100%";
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
  addRect(bkColor, borderColor, x, y, width, height) {
    this.ctx.fillStyle=bkColor;
    this.ctx.strokeStyle=borderColor;
    this.ctx.fillRect(x,y,width,height);
    this.ctx.strokeRect(x,y,width,height);
  }
}

function init(id) {
  let ins = new xcharts(id);
  return ins;
}

export {
  init
}
console.log('123');