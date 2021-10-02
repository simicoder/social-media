import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LogoIcon from '../../../assets/Icons/LogoIcon.png';

export const StyledWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px;
  background-color: ${({ theme }) => theme.itemsBackground};
  align-items: center;
  text-align: center;
  position: fixed;
  justify-content: space-evenly;
  z-index: 9999;
  min-height: 48px;
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;

export const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 50px;
  height: 50px;
  background-image: url(${LogoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  border: none;
  margin: 0.5vh 0 0.5vh 0.5vh;

  @media only screen and (max-width: 600px) {
    margin: 0.5vh 0 0.5vh 0;
  }
`;

export const StyledSearchBarContainer = styled.div`
  width: 600px;
`;

export const StyledProfileContainer = styled.div`
  margin-right: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    margin-right: 10px;
  }
`;
