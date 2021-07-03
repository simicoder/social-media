import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { reducers } from '../reducers/index';

interface IWrapper {
  children: any;
}

function render(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    preloadedState = {},
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  } = {},
) {
  const Wrapper: React.FC<IWrapper> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper as React.FC, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
