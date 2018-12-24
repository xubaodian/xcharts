import { init } from '../../src/xcharts';


let app = init('app');
app.setBackground('#d3d3d3');


let options = {
  bkColor: '#489696',
  borderColor: '#000000',
  x: 10,
  y: 10,
  width: 50,
  height: 100
};
app.addRect(options);


let options2 = {
  bkColor: '#489696',
  borderColor: '#000000',
  x: 120,
  y: 10,
  width: 50,
  height: 100
};
app.addRect(options2);

let options3 = {
  borderColor: '#000000',
  startX: 0,
  startY: 0,
  endX: 300,
  endY: 150
};

app.addLine(options3);


let options4 = {
  borderColor: '#000000',
  x: 200,
  y: 200,
  r: 100,
  rotate: Math.PI,
  size: 0.2*Math.PI
};

app.addSector(options4);
