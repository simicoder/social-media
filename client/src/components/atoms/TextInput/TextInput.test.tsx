import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

const fakeTextInput = {
  label: 'text',
  name: 'name',
  onChange: jest.fn(),
  type: 'password',
  maxLength: 20,
  value: 'value',
};

it('render basic TextInput', async () => {
  render(
    <TextInput
      label={fakeTextInput.label}
      name={fakeTextInput.name}
      onChange={fakeTextInput.onChange}
    />,
  );

  const Input: any = screen.getByTestId('input');

  expect(Input).toHaveAttribute('placeholder', fakeTextInput.label);
  expect(Input).toHaveAttribute('name', fakeTextInput.name);

  fireEvent.change(Input, { target: { value: 'text' } });

  expect(fakeTextInput.onChange).toBeCalledTimes(1);

  expect(screen.getByTestId('label')).toHaveTextContent(fakeTextInput.label);
});

it('render password TextInput', async () => {
  render(
    <TextInput
      label={fakeTextInput.label}
      name={fakeTextInput.name}
      onChange={fakeTextInput.onChange}
      type={fakeTextInput.type}
      maxLength={fakeTextInput.maxLength}
      value={fakeTextInput.value}
    />,
  );

  const Input: any = screen.getByTestId('input');

  expect(Input).toHaveAttribute('placeholder', fakeTextInput.label);
  expect(Input).toHaveAttribute('name', fakeTextInput.name);
  expect(Input).toHaveAttribute('type', fakeTextInput.type);
  expect(Input.maxLength).toBe(fakeTextInput.maxLength);
  expect(Input).toHaveAttribute('value', fakeTextInput.value);

  fireEvent.change(Input, { target: { value: 'password' } });

  expect(fakeTextInput.onChange).toBeCalledTimes(1);

  expect(screen.getByTestId('label')).toHaveTextContent(fakeTextInput.label);
});
