import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../atoms/Comment/Comment';
import { IProps } from './types';

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 170px;
  overflow: auto;
  margin: 10px;

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

export const Comments: React.FC<IProps> = ({ comments }) => {
  const user = JSON.parse(localStorage.getItem('profile')!);

  return (
    <StyledWrapper>
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} />
      ))}
    </StyledWrapper>
  );
};
