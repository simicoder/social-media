import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonIcon } from './ButtonIcon';

it('render basic icon', async () => {
  const fakeSize = 24;
  const fakeIcon = '/icon';

  render(<ButtonIcon size={fakeSize} icon={fakeIcon} />);

  const Button = screen.getByRole('button');

  expect(Button).toHaveStyle(`background-image: url(${fakeIcon})`);
  expect(Button).toHaveStyle(`width: ${fakeSize}px`);
  expect(Button).toHaveStyle(`height: ${fakeSize}px`);
});
