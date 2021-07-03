import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testUtils';
import { Form } from './CommentForm';

it('submiting empty comment and normal comment', async () => {
  const submitMock = jest.fn().mockImplementation((e) => e.preventDefault());

  const fakeComment = 'comment';

  render(<Form handleSubmit={submitMock} />);

  const input = screen.getByTestId('input');
  const submitButton = screen.getByTestId('submit');

  userEvent.type(input, fakeComment);
  userEvent.click(submitButton);

  expect(submitMock).toBeCalledTimes(1);
});
