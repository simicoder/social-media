import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IComments } from '../../molecules/Comments/types';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { Paragraph } from '../Paragraph/Paragraph';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 7px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  background-color: ${({ theme }) => theme.background};
  padding: 5px;
  border-radius: 10px;
`;

const StyledTime = styled.p`
  font-size: 0.8em;
  margin: 0;
  color: ${({ theme }) => theme.lightColor};
`;

type IProps = {
  comment: IComments;
};

export const Comment: React.FC<IProps> = ({ comment }) => (
  <StyledWrapper>
    <ProfileImage alt="avatar" src={comment.creatorImage} />
    <StyledContainer>
      <b>{comment.creatorName}</b>
      <Paragraph tabIndex={0}>{comment.text}</Paragraph>
      <StyledTime>{moment(comment.created).fromNow()}</StyledTime>
    </StyledContainer>
  </StyledWrapper>
);
