import { init } from '../../src/xcharts';


let app = init('app');
app.setBackground('#fff');


// let options = {
//   bkColor: '#489696',
//   borderColor: '#000000',
//   x: 10,
//   y: 10,
//   width: 50,
//   height: 100
// };
// app.addRect(options);


// let options2 = {
//   bkColor: '#489696',
//   borderColor: '#000000',
//   x: 120,
//   y: 10,
//   width: 50,
//   height: 100
// };
// app.addRect(options2);

// let options3 = {
//   borderColor: '#000000',
//   startX: 0,
//   startY: 0,
//   endX: 300,
//   endY: 150
// };

// app.addLine(options3);


// let options4 = {
//   borderColor: '#000000',
//   x: 150,
//   y: 150,
//   r: 100,
//   rotate: Math.PI,
//   size: 0.2*Math.PI
// };

// //app.addSector(options4);

// app.addSectorNoBk(options4);

let options5 = {
 colors: ['#c3c3c3', '#3f5c4c', '#f05c4c'],
 nums: [10, 15, 9]
};

app.addPie(options5);