import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import { routes } from '../routes/index';
import MainTemplate from '../templates/MainTemplate';
import AddPostTemplate from '../templates/AddPostTemplate';
import AuthTemplate from '../templates/AuthTemplate';
import SearchResultTemplate from '../templates/SearchResultTemplate';
import { reducers } from '../reducers';
import { theme } from '../theme/mainTheme';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function Root() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <article>
          <BrowserRouter>
            <Switch>
              <Route exact path={routes.home} component={MainTemplate} />
              <Route exact path={routes.addPost} component={AddPostTemplate} />
              <Route exact path={routes.auth} component={AuthTemplate} />
              <Route exact path={routes.search} component={SearchResultTemplate} />
            </Switch>
          </BrowserRouter>
        </article>
      </ThemeProvider>
    </Provider>
  );
}

export default Root;
