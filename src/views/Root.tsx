import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import { routes } from '../routes/index';
import MainTemplate from '../templates/MainTemplate';

function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.home} component={MainTemplate} />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
