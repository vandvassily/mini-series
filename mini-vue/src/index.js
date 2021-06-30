class Vue {
    constructor(options) {
        let vm = this;
        this.data = options.data;

        // 代理data数据，方便使用this.name 去访问 this.data.name
        Object.keys(this.data).forEach(function (name) {
            proxy(vm, 'data', name);
        });

        // 监听数据变化
        observe(this.data);

        // 解析模板
        new Compile(options.el, this);
    }
}

let vm = new Vue({
    el: '#app',
    data: {
        msg: 'this is self vue'
    }
})

console.log(vm);