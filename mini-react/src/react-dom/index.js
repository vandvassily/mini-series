// src/react-dom/index.js
import render from './render'
// reactDOM主要负责DOM相关的操作，比如虚拟DOM的渲染、虚拟DOM与真实DOM的diff比较
export default { // react-dom只需要提供一个render()方法即可
    render
}