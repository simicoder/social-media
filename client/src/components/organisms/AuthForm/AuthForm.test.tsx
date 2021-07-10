import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act, cleanup } from '../../../utils/testUtils';

import AuthForm from './AuthForm';

afterEach(cleanup);

describe('sing in form', () => {
  test('successful login', async () => {
    const history = createMemoryHistory(['/auth', '/'] as any);

    act(() => {
      render(
        <Router history={history}>
          <Switch>
            <Route path="/auth" component={AuthForm} />
            <Route path="/" render={() => <div>Home Page</div>} />
          </Switch>
          <AuthForm />
        </Router>,
      );
    });

    const email = 'admin@gmail.com';
    const password = 'ZAQ!2wsx';

    const inputEmail = screen.getByPlaceholderText('email');
    const inputPassword = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    await act(async () => userEvent.click(submitButton));

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test('failure loging', async () => {
    render(<AuthForm />);

    const email = 'zle@gmail.com';
    const password = 'ZAQ!2wsx';

    const inputEmail = screen.getByPlaceholderText('email');
    const inputPassword = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    await act(async () => userEvent.click(submitButton));

    await act(async () => expect(await screen.getByText("User doesn't exist")).toBeInTheDocument());
  });

  test('displaying errors from not valid form', async () => {
    render(<AuthForm />);

    const inputEmail = screen.getByPlaceholderText('email');
    const inputPassword = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    await act(async () => userEvent.click(submitButton));
    await act(async () =>
      expect(await screen.getByText(/Please complete all fields/i)).toBeInTheDocument(),
    );

    userEvent.type(inputEmail, 'admin');

    await act(async () => userEvent.click(submitButton));
    await act(async () =>
      expect(await screen.getByText(/Please check your email/i)).toBeInTheDocument(),
    );

    userEvent.type(inputEmail, 'a@gmail.com');

    await act(async () => userEvent.click(submitButton));
    await act(async () =>
      expect(
        await screen.getByText(/Password must be at least 8 characters long and contain numbers/i),
      ).toBeInTheDocument(),
    );

    userEvent.type(inputEmail, 'a@gmail.com');
    userEvent.type(inputPassword, 'acbd');

    await act(async () => userEvent.click(submitButton));
    await act(async () =>
      expect(
        await screen.getByText(/Password must be at least 8 characters long and contain numbers/i),
      ).toBeInTheDocument(),
    );
  });

  test('showing password', async () => {
    render(<AuthForm />);

    const password = 'ZAQ!2wsx';

    const inputPassword = screen.getByText('password');
    const shPassButton = screen.getByText(/Show Passoword/i);

    userEvent.type(inputPassword, password);

    userEvent.click(shPassButton);

    expect(screen.getByText(/Hide password/i)).toBeInTheDocument();
  });
});
