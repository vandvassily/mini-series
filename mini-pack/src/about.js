const cjs2 = require('./cjs2.js');
export function say(text) {
    count++;
    cjs2.count++;
    console.log(`say调用次数为: ${count}, say: ${text}`);
    console.log(`constant调用次数为: ${cjs2.count}`);
}

let count = 0;

export const aboutStr = 'about string';
