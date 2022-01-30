import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './index.module.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className={Styles.universal_wrapper}>
    <App />
    </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

