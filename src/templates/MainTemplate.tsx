import React from 'react';
import styled from 'styled-components';
import UserPageTemplate from './UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const MainTemplate: React.FC = () => (
  <>
    <GlobalStyle />
    <UserPageTemplate>
      <StyledWrapper>
        <div>hello</div>
      </StyledWrapper>
    </UserPageTemplate>
  </>
);

export default MainTemplate;
