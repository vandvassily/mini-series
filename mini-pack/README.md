# 仿写webpack

## webpack核心概念

Webpack 核心概念：
Entry（入口）：Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
Output（出口）：指示 webpack 如何去输出、以及在哪里输出
Module（模块）：在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
Chunk（代码块）：一个 Chunk 由多个模块组合而成，用于代码合并与分割。
Loader（模块转换器）：用于把模块原内容按照需求转换成新内容。
Plugin（扩展插件）：在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件，并改变输出结果

## 仿写

1. 初始化参数，读取 `minipack.config.js` 中的配置
2. 开始编译
3. 查找入口文件的依赖，递归查找所有依赖的依赖；同时考虑 `import` 和 `commonJS` 情况
4. 完成编译，得到每个模块的最终内容和他们的依赖关系
5. 输出资源，根据入口和每个模块的依赖关系，组装成一个个包含多个模块的chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
6. 输出完成，在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

核心点：

1. 查找模块依赖
2. 输出资源，如何组装

已完成：

1. 配置文件
2. `import` `commonJS` 依赖查找
3. 编译和输出

未完成：

1. loader
2. 插件体系

## 参考

[mini-pack 实现原理讲解](https://github.com/mcuking/blog/issues/77)

[webpack模块化原理-commonjs](https://segmentfault.com/a/1190000010349749)

[tiny-webpack](https://github.com/hua1995116/tiny-webpack)