import React from '../react';
import ReactDOM from '../react-dom';
import Welcome from './welcome';

const element = <div>hello mini-react</div>;

console.log(element);

// ReactDOM.render(element, document.getElementById('root'));

const tick = () => {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
      <Welcome name={'vassily'} />
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
};

setInterval(tick, 1000);
