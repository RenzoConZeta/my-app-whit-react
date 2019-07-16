import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './index.scss'


ReactDOM.render(
  <App />
  , document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
