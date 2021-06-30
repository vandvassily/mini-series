// 解析模板
// 1.解析模板指令，并替换模板数据，初始化视图
// 2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器

class Compile {
    constructor(el, vm) {
        this.el = document.querySelector(el);
        this.vm = vm;
        this.fragment = null;

        this.init();
    }

    init() {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }
    }

    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;

        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }

        return fragment;
    }

    compileElement(fragment) {
        let childNodes = fragment.childNodes;
        let self = this;

        const reg = /\{\{\s*(.*?)\s*\}\}/;

        Array.prototype.slice.call(childNodes).forEach(function (node) {
            const text = node.textContent;

            if (self.isElementNode(node)) {
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    }

    compile(node) {
        let nodeAttrs = node.attributes;
        let self = this;
        Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
            let exp = attr.value;
            if (self.isEventDirective(attr.name)) {
                self.compileEvent(node, self.vm, attr.name, exp);
            } else if (self.isModelDirective(attr.name)) {
                self.compileModel(node, self.vm, attr.name, exp);
            }
        });
    }

    compileText(node, exp) {
        let self = this;
        let express = `with(this){ return ${exp}}`;
        let func = new Function(express);
        let initText = func.bind(this.vm)();
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    }

    compileEvent(node, vm, directive, exp) {
        let event = directive.split(':')[1];
        let cb = vm.methods[exp];
        if (event && cb) {
            node.addEventListener(event, cb.bind(vm), false);
        }
    }

    compileModel(node, vm, directive, exp) {
        let self = this;
        let value = vm[exp];
        this.updateModel(node, value);
        new Watcher(this.vm, exp, function (value) {
            self.updateModel(node, value);
        });

        node.addEventListener(
            'input',
            function (e) {
                let value = e.target.value;
                vm[exp] = value;
            },
            false
        );
    }

    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    }

    updateModel(node, value) {
        node.value = typeof value === 'undefined' ? '' : value;
    }

    isDirective(attr) {
        return attr.indexOf('v-') == 0;
    }

    isEventDirective(attr) {
        return attr.indexOf('on:') == 0;
    }

    isModelDirective(attr) {
        return attr.indexOf('v-model') == 0;
    }

    isElementNode(node) {
        return node.nodeType == 1;
    }

    isTextNode(node) {
        return node.nodeType == 3;
    }
}
