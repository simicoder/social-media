import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.button};
  border-radius: 2px;
  border: none;
  padding: 8px 15px;
  margin: 10px;
  transition: all 0.2s;

  :hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.active};
  }
`;

export default Button;
