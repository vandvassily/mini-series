import React from './react';
import ReactDOM from './react-dom';
// import Welcome from './welcome';

const Test = () => {
  return <div onClick={click}>hello mini-react</div>;
};

// console.log(element);

function click() {
  console.log('click');
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  click = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h1 onClick={this.click}>hello {this.props.name}</h1>
        <div>{this.state.count}</div>
        <Test />
      </div>
    );
  }
}

// console.log(<App name="vassily" />)

ReactDOM.render(<App name="vassily" />, document.getElementById('root'));

// const tick = () => {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}</h2>
//       <Welcome name={'vassily'} />
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// };

// setInterval(tick, 1000);
