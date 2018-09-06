import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Hello from './components/hello';

// const root = <div>
//     <Hello name="Lukhwa" />
//     <Hello name="rendani" />
//     <App />
// </div>

ReactDOM.render(<App/> , document.getElementById('root'));
// ReactDOM.render(<Hello name="Lukhwa"/>, document.getElementById('rere'));

registerServiceWorker();