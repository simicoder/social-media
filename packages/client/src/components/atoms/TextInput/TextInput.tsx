import React from 'react';
import { Wrapper, StyledLabel, StyledInput } from './TextInput.styled';

interface IProps {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  maxLength?: number;
  value?: string;
}

export const TextInput = ({ label, name, onChange, type, maxLength, value }: IProps) => (
  <Wrapper>
    <StyledInput
      placeholder={label}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      type={type}
      value={value}
      required
      data-testid="input"
    />
    <StyledLabel className="label" htmlFor={name} data-testid="label">
      {label}
    </StyledLabel>
  </Wrapper>
);
