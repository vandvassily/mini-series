import { say } from './about.js';
const constant = require('./constant.js');

var num = '123';
console.log(num);
console.log(constant.arr);
const sum = constant.sum(3, 4);
console.log(`计算两数之和为: ${sum}`);

const btn1 = document.getElementById('btn1');
btn1.addEventListener(
    'click',
    (e) => {
        say(num);
    },
    false
);

