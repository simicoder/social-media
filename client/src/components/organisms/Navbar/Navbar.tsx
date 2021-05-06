import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoIcon from '../../../assets/Icons/LogoIcon.png';
import Button from '../../atoms/Button/Button';
import { hostUrl } from '../../../constants/url';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';

const StyledWrapper = styled.nav`
  display: flex;
  width: 100%;
  padding: 0px;
  background-color: ${({ theme }) => theme.itemsBackground};
  align-items: center;
  text-align: center;
  position: fixed;
  justify-content: space-between;
  z-index: 9999;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 50px;
  height: 50px;
  background-image: url(${LogoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  border: none;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
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

const StyledProfileContainer = styled.div`
  margin-right: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Navbar: React.FC = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/auth');

    setUser(null);
  };

  return (
    <StyledWrapper>
      <StyledLogoLink to="/" />
      <StyledLinksList>
        <StyledLi>
          <StyledNavLink to="/">HOME</StyledNavLink>
        </StyledLi>
      </StyledLinksList>
      <StyledProfileContainer>
        {user?.result ? (
          <>
            <Button color="secondary" onClick={logout}>
              Logout
            </Button>
            <ProfileImage width="40px" alt="avatar" src={hostUrl + user?.result.selectedFile} />
          </>
        ) : (
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        )}
      </StyledProfileContainer>
    </StyledWrapper>
  );
};
export default Navbar;
