import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testUtils';
import { SearchForm } from './SearchBar';

it('searching', async () => {
  const handleSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
  const fakeText = 'dsads';

  render(<SearchForm handleSubmit={handleSubmit} />);

  const input = screen.getByTestId('input');
  const submitButton = screen.getByTestId('submit');

  userEvent.type(input, fakeText);
  userEvent.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
});
