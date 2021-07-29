import React from 'react';
import ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, act, waitFor, waitForElementToBeRemoved } from '../../../utils/testUtils';
import { AuthForm } from './AuthForm';

describe('sing in form', () => {
  test('successful login', async () => {
    const history = createMemoryHistory(['/auth', '/'] as any);

    act(() => {
      render(
        <Router history={history}>
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
  });

  test('failure loging', async () => {
    render(<AuthForm />);

    const inputEmail = screen.getByPlaceholderText('email');
    const inputPassword = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    userEvent.type(inputEmail, 'admin@gmail.com');
    userEvent.type(inputPassword, 'ZAQ!2wsx');

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/User doesn't exist/i)).toBeInTheDocument();
    });
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

describe('sing up form', () => {
  test('display error with not uplouded image', async () => {
    render(<AuthForm />);

    userEvent.click(screen.getByRole('button', { name: 'Go to Sign Up' }));

    const name = 'admin';
    const email = 'admin@gmail.com';
    const password = 'ZAQ!2wsx';

    const inputName = screen.getByPlaceholderText('name');
    const inputEmail = screen.getByPlaceholderText('email');
    const inputPassword = screen.getByPlaceholderText('password');
    const inputConfirmPassword = screen.getByPlaceholderText('confirm password');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    userEvent.type(inputName, name);
    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);
    userEvent.type(inputConfirmPassword, password);

    await act(async () => userEvent.click(submitButton));
    await act(async () => expect(await screen.getByText(/Add profile image/i)).toBeInTheDocument());
  });
});
