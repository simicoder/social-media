import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonIcon from '../../atoms/Icon/ButtonIcon';
import addIcon from '../../../assets/Icons/addIcon.svg';
import homeIcon from '../../../assets/Icons/homeIcon.svg';

const StyledWrapper = styled.nav`
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: ${({ theme }) => theme.itemsBackground};
  position: fixed;
  height: 100%;
  overflow: auto;
  margin-top: 50px;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const StyledLi = styled.li`
  display: flex;
  margin-top: 2vh;
  justify-content: center;
`;

const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
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
        <StyledNavLink to="/">
          <ButtonIcon icon={homeIcon} size={90} />
        </StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink to="/addPost">
          <ButtonIcon icon={addIcon} size={90} />
        </StyledNavLink>
      </StyledLi>
    </StyledLinksList>
    <StyledFooter>Website by SimiCoder</StyledFooter>
  </StyledWrapper>
);

export default Sidebar;
