import React from 'react';
import styled from 'styled-components';

const Icon = styled.button<{ size: number; icon: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: #1a1919;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  color: ${({ theme }) => theme.lightColor};
  border: none;
  padding: 4px;
  font-weight: ${({ theme }) => theme.bold};

  :hover {
    background-color: ${({ theme }) => theme.active};
  }
`;

export default Icon;
