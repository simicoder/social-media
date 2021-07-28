import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledWrapper = styled.nav`
  z-index: 1000;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: ${({ theme }) => theme.itemsBackground};
  position: fixed;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({ theme }) => theme.background};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.button};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.active};
  }
`;

export const StyledLinksList = styled.ul`
  padding: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;

export const StyledLi = styled.li`
  display: flex;
  margin-top: 2vh;
  justify-content: center;
`;

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
`;

export const StyledFooter = styled.footer`
  width: 200px;
  background-color: black;
  padding: 0.5vh;
  color: #5c5a5c;
  display: flex;
  text-align: center;
  justify-content: center;
`;
