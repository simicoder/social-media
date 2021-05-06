import React from 'react';
import styled from 'styled-components';

const ButtonIcon = styled.button<{ size: number; icon: string }>`
  display: block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 20px;
  background-color: #1a1919;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;
  outline: 0;
  transition: all 0.2s;

  :hover {
    transform: scale(1.1);
  }
`;

export default ButtonIcon;
