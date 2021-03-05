const { getAST, getDependencies, transform, removeDir } = require('./utils.js');
const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
    constructor(options) {
        const { entry, output } = options;

        this.entry = entry;
        this.output = output;

        // this.modules = [];
        this.modules = {};

        this.run();
    }

    run() {
        this.buildModule(this.entry, true);

        this.emitFiles();
    }

    buildModule(filename, isEntry) {
        const _module = this.build(filename, isEntry);

        // this.modules.push(_module);
        this.modules[filename] = _module;
        _module.dependencies.forEach((path) => {
            this.buildModule(path, false);
        });
    }

    build(filename, isEntry) {
        let ast;

        if (isEntry) {
            ast = getAST(filename);
        } else {
            const absolutePath = path.join(process.cwd(), './src', filename);
            ast = getAST(absolutePath);
        }

        return {
            filename,
            source: transform(ast),
            dependencies: getDependencies(ast)
        };
    }

    emitFiles() {
        let modules = '';

        Object.keys(this.modules).forEach((_module) => {
            console.log(`依赖为: ${this.modules[_module].filename}`);
            modules += `'${this.modules[_module].filename}': function(require, module, exports) {${this.modules[_module].source}},`;
        });

        // 核心
        const bundle = `(function(modules) {
            // 已加载的模块
            var installedModules = {};
            function require(moduleId) {
                if(installedModules[moduleId]) {
                    return installedModules[moduleId].exports;
                }
                var module = installedModules[moduleId] = {
                    i: moduleId,
                    loaded: false,
                    exports: {}
                };
                
                var moduleFunc = modules[moduleId];

                // 绑定模块内的this
                moduleFunc.call(module.exports, require, module, module.exports);
                module.loaded = true;
                return module.exports;
            }

            return require('${this.entry}')
        })({${modules}})`;

        const distPath = path.join(process.cwd(), './dist');
        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath);
        }

        const outputPath = path.join(this.output.path, this.output.filename);
        fs.writeFileSync(outputPath, bundle, 'utf-8');

        this.emitHtml();
    }

    // 将 html 插入 script 标签（引入打包后的 bundle js），并输出到指定目录中
    emitHtml() {
        const publicHtmlPath = path.join(process.cwd(), './public/index.html');
        let html = fs.readFileSync(publicHtmlPath, 'utf-8');
        html = html.replace(
            /<\/body>/,
            `  <script type="text/javascript" src="./main.js"></script>
  </body>`
        );

        const distHtmlPath = path.join(process.cwd(), './dist/index.html');
        fs.writeFileSync(distHtmlPath, html, 'utf-8');
    }
};
