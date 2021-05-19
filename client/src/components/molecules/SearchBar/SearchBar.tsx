import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import SearchButton from '../../atoms/SearchButton/SearchButton';
import { searchPosts } from '../../../actions/posts';

const StyledForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 8px;
  border: solid 1px black;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};

  :focus {
    outline: solid 1px #535353;
  }
`;

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    history.push('/search');
    dispatch(searchPosts(e.target.text.value));
  };

  return (
    <StyledForm onSubmit={HandleSubmit} noValidate autoComplete="off">
      <StyledInput name="text" placeholder="Search" />
      <SearchButton />
    </StyledForm>
  );
};

export default SearchBar;
