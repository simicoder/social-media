import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { routes } from '../routes/index';
import { Main } from './Main';
import { AddPost } from './AddPost';
import { Auth } from './Auth';
import { SearchResult } from './SearchResult';
import { theme } from '../theme/mainTheme';
import { AuthChecker } from '../components/molecules/AuthChecker/AuthChecker';

export function Root() {
  return (
    <AuthChecker>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path={routes.home} component={Main} />
            <Route exact path={routes.addPost} component={AddPost} />
            <Route exact path={routes.auth} component={Auth} />
            <Route exact path={routes.search} component={SearchResult} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </AuthChecker>
  );
}
