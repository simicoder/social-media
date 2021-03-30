import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.nav`
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #242424;
  position: fixed;
  height: 100%;
  overflow: auto;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLi = styled.li`
  display: inline-block;
  margin-top: 2vh;
`;

const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
  margin-left: 2em;
`;

const StyledFooter = styled.footer`
  width: 200px;
  background-color: black;
  bottom: 0;
  padding: 0.5vh;
  color: #5c5a5c;
  display: block;
  position: fixed;
  text-align: center;
`;

const Sidebar: React.FC = () => (
  <StyledWrapper>
    <StyledLinksList>
      <StyledLi>
        <StyledNavLink to="/">HOME</StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink to="/about">ABOUT US</StyledNavLink>
      </StyledLi>
    </StyledLinksList>
    <StyledFooter>Website by SimiCoder</StyledFooter>
  </StyledWrapper>
);

export default Sidebar;
