const arr = ['this', 'is', 'commonJS'];
const constantStr = 'this is commonJS string';
const cjs2 = require('./cjs2.js');
import { aboutStr, say } from './about.js';
let count = 0;


/**
 * 计算两数之和
 * @param {number} a
 * @param {number} b
 */
const sum = function (a = 1, b = 2) {
    return a + b;
};

const btn2 = document.getElementById('btn2');
btn2.addEventListener(
    'click',
    (e) => {
        say(111);
        cjs2.count++;
        console.log(`cjs2调用次数为: ${cjs2.count}`);
    },
    false
);

console.log(aboutStr);

module.exports = {
    arr,
    constantStr,
    sum,
    count
};
