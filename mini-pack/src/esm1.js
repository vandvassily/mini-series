let count = 0;

export function say() {
    count++;
    console.log(`esm1的count调用次数为: ${count}`);
}

export const str1 = 'str1';
