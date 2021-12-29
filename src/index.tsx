import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/Context'
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
