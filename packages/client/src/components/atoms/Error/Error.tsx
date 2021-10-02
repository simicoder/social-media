import React from 'react';
import styled from 'styled-components';

export const Error = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  width: 93%;
  font-size: 1em;
  color: ${({ theme }) => theme.error};
`;
