import React from 'react';
import styled from 'styled-components';

const Icon = styled.button<{ size: number; icon: string }>`
  display: block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: #1a1919;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70% 70%;
  border: none;

  :hover {
    background-color: ${({ theme }) => theme.active};
  }
`;

export default Icon;
