import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { routes } from '../routes/index';
import MainTemplate from '../templates/MainTemplate';
import AddPostTemplate from '../templates/AddPostTemplate';
import AuthTemplate from '../templates/AuthTemplate';
import SearchResultTemplate from '../templates/SearchResultTemplate';
import { theme } from '../theme/mainTheme';

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.home} component={MainTemplate} />
          <Route exact path={routes.addPost} component={AddPostTemplate} />
          <Route exact path={routes.auth} component={AuthTemplate} />
          <Route exact path={routes.search} component={SearchResultTemplate} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Root;
