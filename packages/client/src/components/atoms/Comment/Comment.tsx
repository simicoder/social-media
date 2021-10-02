import React from 'react';
import moment from 'moment';
import { IComment } from '../../../types/IComment';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { Paragraph } from '../Paragraph/Paragraph';
import { StyledWrapper, StyledContainer, StyledTime } from './Comment.styled';

type IProps = {
  comment: IComment;
};

export const Comment = ({ comment }: IProps) => (
  <StyledWrapper>
    <ProfileImage alt="avatar" src={comment.creatorImage} />
    <StyledContainer>
      <b>{comment.creatorName}</b>
      <Paragraph tabIndex={0}>{comment.text}</Paragraph>
      <StyledTime>{moment(comment.created).fromNow()}</StyledTime>
    </StyledContainer>
  </StyledWrapper>
);
