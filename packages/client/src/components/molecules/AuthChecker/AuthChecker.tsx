import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { checktoken } from '../../../redux/actions/auth';

const StyledError = styled.p`
  position: absolute;
  color: red;
  top: 10px;
`;

export const AuthChecker = ({ children }) => {
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(checktoken());
    } catch (err) {
      setError(err as string);
    }
  }, []);

  return (
    <main>
      <StyledError>{error}</StyledError>
      {children}
    </main>
  );
};
