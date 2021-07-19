import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Root } from './views/Root';
import reportWebVitals from './reportWebVitals';
import { reducers } from './reducers';
import { worker } from './mocks/browser';

export const store = configureStore({ reducer: reducers });

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
