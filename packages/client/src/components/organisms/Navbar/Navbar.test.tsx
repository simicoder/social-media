import React from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '../../../utils/testUtils';
import { Navbar } from './Navbar';

const mockSetIsOpen = jest.fn();

test('render with normal size', async () => {
  const history = createMemoryHistory(['/', '/auth'] as any);

  act(() => {
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" component={Navbar} />
          <Route path="/auth" render={() => <div>Sign In</div>} />
        </Switch>
      </Router>,
    );
  });

  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
});
