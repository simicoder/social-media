import React from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '../../../utils/testUtils';
import { Sidebar } from './Sidebar';

test('render with normal size', async () => {
  const history = createMemoryHistory(['/', '/addPost'] as any);

  render(
    <Router history={history}>
      <Switch>
        <Route path="/" component={Sidebar} />
        <Route path="/addPost" render={() => <div>add post</div>} />
      </Switch>
    </Router>,
  );

  const AddPostButton = screen.getByRole('button', { name: 'Add Post' });

  userEvent.click(AddPostButton);

  expect(screen.getByText('Add Post')).toBeInTheDocument();
});
