import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@/store';
import { GlobalStyle } from '@/styles';
import './font.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  rootElement,
);
