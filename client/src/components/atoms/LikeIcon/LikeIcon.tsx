import styled from 'styled-components';
import likeActiveIcon from '../../../assets/Icons/likeActiveIcon.svg';
import likeUnActiveIcon from '../../../assets/Icons/likeUnActiveIcon.svg';

export const LikeIcon = styled.button<{ isActive: boolean }>`
  display: block;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-image: url(${({ isActive }) => (isActive ? likeActiveIcon : likeUnActiveIcon)});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 70% 70%;
  border: none;
  background-color: black;

  :hover {
    background-color: ${({ theme }) => theme.active};
  }
`;
