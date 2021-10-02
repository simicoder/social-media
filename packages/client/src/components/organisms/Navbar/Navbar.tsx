import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../atoms/Button/Button';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';
import { useWindowWidth } from '../../../utils/useWindowWidth';
import { SearchButton } from '../../atoms/SearchButton/SearchButton';
import { BackButton } from '../../atoms/BackButton/BackButton';
import { signout } from '../../../redux/actions/auth';
import {
  StyledWrapper,
  StyledLogoContainer,
  StyledLogoLink,
  StyledSearchBarContainer,
  StyledProfileContainer,
} from './Navbar.styled';
import { RootState } from '../../../redux/store';

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ isOpen, setIsOpen }: IProps) => {
  const user = useSelector((state: RootState) => state.auth.data);
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const windowWidth = useWindowWidth();

  const logout = () => {
    dispatch(signout(history));
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
            {windowWidth < 1024 && (
              <MenuButton onClick={setOpen} aria-label="menu" data-testid="menuButton" />
            )}
            <StyledLogoLink aria-label="homepage" to="/" />
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
                <ProfileImage width="40px" alt="avatar" src={user?.result.imageUrl} />
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
