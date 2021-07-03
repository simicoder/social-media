import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../../assets/Icons/searchIcon.svg';

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80px;
  background-color: ${({ theme }) => theme.background};
  height: 34px;
  color: ${({ theme }) => theme.color};
  border: none;
  border: solid 1px black;
`;

const StyledIcon = styled.div`
  width: 45px;
  height: 34px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 90% 90%;
  background-color: ${({ theme }) => theme.background};
`;

const SearchButton = () => (
  <StyledButton data-testid="submit">
    Search
    <StyledIcon />
  </StyledButton>
);

export default SearchButton;
