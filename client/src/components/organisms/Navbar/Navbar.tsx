import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoIcon from '../../../assets/Icons/LogoIcon.png';
import Button from '../../atoms/Button/Button';
import { imageUrl } from '../../../constants/url';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';
import MenuButton from '../../atoms/MenuButton/MenuButton';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import useWindowWidth from '../../../utils/useWindowWidth';
import SearchButton from '../../atoms/SearchButton/SearchButton';
import BackButton from '../../atoms/BackButton/BackButton';

const StyledWrapper = styled.nav`
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

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
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
  margin: 0.5vh 0 0.5vh 0.5vh;

  @media only screen and (max-width: 600px) {
    margin: 0.5vh 0 0.5vh 0;
  }
`;

const StyledSearchBarContainer = styled.div`
  width: 600px;
`;

const StyledProfileContainer = styled.div`
  margin-right: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    margin-right: 10px;
  }
`;

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
};

const Navbar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!));
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const windowWidth = useWindowWidth();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/auth');

    setUser(null);
  };

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledWrapper>
      {activeSearchBar ? (
        <>
          <BackButton onClick={() => setActiveSearchBar(false)} />
          <SearchBar />
        </>
      ) : (
        <>
          <StyledLogoContainer>
            {windowWidth < 1024 && <MenuButton onClick={setOpen} />}
            <StyledLogoLink to="/"></StyledLogoLink>
          </StyledLogoContainer>
          {windowWidth < 550 ? (
            <div onClick={() => setActiveSearchBar(true)}>
              <SearchButton />
            </div>
          ) : (
            <StyledSearchBarContainer>
              <SearchBar />
            </StyledSearchBarContainer>
          )}
          <StyledProfileContainer>
            {user?.result ? (
              <>
                <Button onClick={logout}>Logout</Button>
                <ProfileImage
                  width="40px"
                  alt="avatar"
                  src={user?.result.imageUrl || imageUrl + user?.result.selectedFile}
                />
              </>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </StyledProfileContainer>
        </>
      )}
    </StyledWrapper>
  );
};
export default Navbar;
