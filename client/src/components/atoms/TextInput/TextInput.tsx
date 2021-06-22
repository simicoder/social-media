import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 90%;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${({ theme }) => theme.color};
`;

const StyledInput = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.button};
  outline: 0;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color};
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  :focus {
    ~ .label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: ${({ theme }) => theme.lightColor};
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: ${({ theme }) => theme.lightColor};
    border-image-slice: 1;
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`;

type Props = {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  maxLength?: number;
  value?: string;
};

const TextInput: React.FC<Props> = ({ label, name, onChange, type, maxLength, value }) => (
  <Wrapper>
    <StyledInput
      placeholder={label}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      type={type}
      value={value}
      required
    />
    <StyledLabel className="label" htmlFor={name}>
      {label}
    </StyledLabel>
  </Wrapper>
);

export default TextInput;
