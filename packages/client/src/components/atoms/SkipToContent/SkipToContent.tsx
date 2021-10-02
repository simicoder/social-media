import React from 'react';
import styled from 'styled-components';

export const SkipToContent = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 90px;
  background-color: ${({ theme }) => theme.background};
  height: 40px;
  color: ${({ theme }) => theme.color};
  border: none;
  border: solid 1px black;
  position: absolute;
  overflow: hidden;
  z-index: -999;

  :focus {
    overflow: auto;
    z-index: 99999;
  }
`;
