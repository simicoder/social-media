import React from 'react';
import styled from 'styled-components';
import arrowBackIcon from '../../../assets/Icons/arrowBackIcon.svg';

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.background};
  border: none;
  outline: 0;
  background-image: url(${arrowBackIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80% 80%;
  height: 33px;
  width: 33px;
`;

export default BackButton;
