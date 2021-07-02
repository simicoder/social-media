import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import reportWebVitals from './reportWebVitals';
import { reducers } from './reducers';

export const store = configureStore({ reducer: reducers });

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
