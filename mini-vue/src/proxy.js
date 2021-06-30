// 代理data中属性
function proxy(target, sourceKey, name) {
    Object.defineProperty(target, name, {
        enumerable: true,
        configurable: true,
        get() {
            return this[sourceKey][name];
        },
        set(val) {
            this[sourceKey][name] = val;
        }
    });
}
