import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LogoIcon from '../../../assets/Icons/LogoIcon.png';

const StyledWrapper = styled.nav`
  display: flex;
  width: 100%;
  padding: 0px;
  background-color: #242424;
  align-items: center;
  text-align: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${LogoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-top: 3vh;
  margin-bottom: 3vh;
  margin-left: 2vh;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLi = styled.li`
  display: inline-block;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
  margin-left: 2em;
`;

const Navbar: React.FC = () => (
  <StyledWrapper>
    <StyledLogoLink to="/" />
    <StyledLinksList>
      <StyledLi>
        <StyledNavLink to="/home">HOME</StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink to="/about">ABOUT US</StyledNavLink>
      </StyledLi>
    </StyledLinksList>
  </StyledWrapper>
);

export default Navbar;
