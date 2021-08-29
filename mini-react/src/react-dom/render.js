// src/react-dom/render.js
// 接收一个虚拟DOM节点，并且将虚拟DOM节点渲染成真实的DOM节点，然后添加到container容器中进行挂载
function render(vnode, container) {
  if (vnode.isReactComponent) {
    container.innerHTML = '';
    // 如果是直接渲染类组件
    const component = vnode;
    component._container = container;
    vnode = vnode.render(); // 直接调用组件对象的render()方法拿到对应的虚拟DOM开始渲染
  }

  if (typeof vnode.tag === 'function' && !vnode.isReactComponent) {
    // 这是一个函数组件
    if (vnode.tag.prototype && vnode.tag.prototype.render) {
      // 这是一个类组件
      const component = new vnode.tag(vnode.attrs);
      console.dir(component);
      component._container = container; // 根据类组件名创建组件实例并调用render()函数拿到对应的虚拟DOM节点
      vnode = component.render();
    } else {
      vnode = vnode.tag(vnode.attrs || {}); // 执行函数组件，并传入属性集，拿到对应的虚拟DOM节点即可
    }
  }

  // 由于ReactDOM可以直接渲染一段文本，所以这个vnode可能是一个字符串或数字
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    const textNode = document.createTextNode(vnode); // 直接创建一个文本节点
    container.appendChild(textNode); // 将创建的文本节点添加到容器中即可
    return;
  }

  // 如果vnode不是一个字符串，那么其就是一个虚拟DOM对象，那么我们根据tag名创建对应的真实DOM元素即可
  const element = document.createElement(vnode.tag);
  // 处理属性
  Object.keys(vnode.attrs).forEach((key) => {
    if (key === 'className') {
      key = 'class';
    }
    const value = vnode.attrs[key];
    if (typeof value === 'function') {
      // 如果属性值为一个函数，说明是绑定事件
      element[key.toLowerCase()] = value;
    } else {
      element.setAttribute(key, vnode.attrs[key]);
    }
  });
  // 处理子节点，递归渲染子节点
  vnode.children.forEach((child) => {
    return render(child, element);
  });
  container.appendChild(element); // 将渲染好的虚拟DOM节点添加到容器中
}
export default render;
