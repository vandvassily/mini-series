// src/react/create-elemnt.js

// 作用就是接收babel解析jsx后的结果作为参数，创建并返回虚拟DOM节点对象
function createElement(tag, attrs, ...children) {
    attrs = attrs || {}; // 如果元素的属性为null，即元素上没有任何属性，则设置为一个{}空的对象
    const key = attrs.key || null; // 如果元素上有key，则去除key，如果没有则设置为null
    return { // 创建一个普通JavaScript对象，并将各属性添加上去，作为虚拟DOM进行返回
        key,
        tag,
        attrs,
        children
    }
}
export default createElement;