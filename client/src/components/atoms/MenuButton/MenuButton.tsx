import styled from 'styled-components';
import menuIcon from '../../../assets/Icons/menuIcon.svg';

const MenuButton = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.button};
  background-image: url(${menuIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 90% 90%;
  border-radius: 2px;
  border: none;
  margin-left: 10px;
  outline: 0;
  width: 5vh;
  height: 5vh;
  transition: all 0.2s;

  :hover {
    transform: scale(1.1);
  }
`;

export default MenuButton;
