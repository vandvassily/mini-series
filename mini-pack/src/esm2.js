const cjs2 = require('./cjs2.js');
let count = 0;

export function say() {
    count++;
    cjs2.count++;
    console.log(`esm2的count调用次数为: ${count}`);
    console.log(`esm2调用cjs2的count，count为: ${cjs2.count}`);
}

export const str2 = 'str2';
