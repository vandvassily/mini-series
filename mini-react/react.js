import { renderComponent } from './react-dom';

// 将上文定义的createElement方法放到对象React中
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

class Component {
  constructor(props) {
    this.state = {};
    this.props = props;
  }

  setState(stateChange) {
    // 合并stateChange到state中
    Object.assign(this.state, stateChange);

    renderComponent(this);
  }
}

const React = {
  createElement,
  Component
};


export default React;
