import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Root } from './views/Root';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { worker } from './test/browser';
import { store } from './redux/store';

if (process.env.NODE_ENV === 'test') {
  worker.start();
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

reportWebVitals();
