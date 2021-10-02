import React from 'react';
import { ButtonIcon } from '../../atoms/ButtonIcon/ButtonIcon';
import addIcon from '../../../assets/Icons/addIcon.svg';
import homeIcon from '../../../assets/Icons/homeIcon.svg';
import {
  StyledWrapper,
  StyledLinksList,
  StyledLi,
  StyledNavLink,
  StyledFooter,
} from './Sidebar.styled';

export const Sidebar = () => (
  <StyledWrapper>
    <StyledLinksList>
      <StyledLi>
        <StyledNavLink to="/">
          <ButtonIcon icon={homeIcon} size={90}>
            Home
          </ButtonIcon>
        </StyledNavLink>
      </StyledLi>
      <StyledLi>
        <StyledNavLink to="/addPost">
          <ButtonIcon icon={addIcon} size={90}>
            Add Post
          </ButtonIcon>
        </StyledNavLink>
      </StyledLi>
    </StyledLinksList>
    <StyledFooter>Website by SimiCoder</StyledFooter>
  </StyledWrapper>
);
