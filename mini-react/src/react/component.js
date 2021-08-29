// src/react/component.js
import ReactDOM from '../react-dom'

class Component {
    constructor(props = {}) {
        this.isReactComponent = true; // 是react组件
        this.props = props; // 保存props属性集
        this.state = {}; // 保存状态数据

        this._container = null;
    }

    setState(newState) {
        Object.assign(this.state, newState); // 更新状态数据
        ReactDOM.render(this, this._container); // 重新渲染组件
    }
}
export default Component;