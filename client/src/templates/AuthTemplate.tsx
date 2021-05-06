import React, { useState } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/organisms/AuthForm/AuthForm';
import GlobalStyle from '../theme/GlobalStyle';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUp: React.FC = () => (
  <>
    <GlobalStyle />
    <StyledWrapper>
      <AuthForm />
    </StyledWrapper>
  </>
);

export default SignUp;
