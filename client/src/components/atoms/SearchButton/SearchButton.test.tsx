import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchButton } from './SearchButton';

it('render SearchButton', async () => {
  render(<SearchButton />);

  const Button = screen.getByRole('button');

  expect(Button).toHaveTextContent('Search');
});
