// 监听属性
function defineReactive(obj, key, val) {
    observe(val); // 递归遍历所有子属性

    const dep = new Dep(key);

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            // console.log('属性' + key + '已经被监听了，现在值为：' + val);
            return val;
        },
        set: function (newVal) {
            val = newVal;
            dep.notify();
            // console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
        }
    });
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
}
