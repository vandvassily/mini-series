const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = {
    /**
     * 将路径下的文件转为AST语法树
     * @param {string} path 路径
     */
    getAST(path) {
        const file = fs.readFileSync(path, 'utf-8');

        return parse(file, {
            sourceType: 'module'
        });
    },

    // 通过 babel-traverse 遍历所有节点
    getDependencies(ast) {
        const dependencies = [];

        traverse(ast, {
            // 根据 ImportDeclaration 节点来收集一个模块的依赖
            ImportDeclaration({ node }) {
                dependencies.push(node.source.value);
            },
            CallExpression: ({ node }) => {
                // 收集commonJS模块的依赖
                if (node.callee.name === 'require') {
                    dependencies.push(node.arguments[0].value);
                }
            }
        });
        return dependencies;
    },

    // 将转化后 ast 的代码重新转化成代码
    // 并通过配置 @babel/preset-env 预置插件编译成 es5
    transform(ast) {
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
        return code;
    },

    /**
     * 移除文件夹
     * @param {string} path 路径
     * @param {boolean} isForce 是否强制删除
     */
    removeDir(path, isForce) {
        fs.rmSync(path, { force: true });
    }
};
