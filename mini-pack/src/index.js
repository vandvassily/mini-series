import { say } from './esm1.js';
import { say as say2 } from './esm2.js';
const cjs1 = require('./cjs1.js');
const cjs2 = require('./cjs2.js');

document.getElementById('btn1').addEventListener('click', () => {
    say();
});
document.getElementById('btn2').addEventListener('click', () => {
    say2();
});
document.getElementById('btn3').addEventListener('click', () => {
    cjs1.count++;
    console.log(`cjs1.countcount调用次数为: ${cjs1.count}`);
});
document.getElementById('btn4').addEventListener('click', () => {
    cjs2.count++;
    console.log(`cjs1.countcount调用次数为: ${cjs2.count}`);
});
