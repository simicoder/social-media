import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IComments } from '../../molecules/Comments/Comments';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';
import { hostUrl } from '../../../constants/url';
import Paragraph from '../Paragraph/Paragraph';

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

type IProps = {
  comment: IComments;
};

const Comment: React.FC<IProps> = ({ comment }) => (
  <StyledWrapper>
    <ProfileImage alt="avatar" src={`${hostUrl}profile/${comment.creator}`} />
    <StyledContainer>
      <b>{comment.creatorName}</b>
      <Paragraph>{comment.text}</Paragraph>
      <Paragraph>{moment(comment.created).fromNow()}</Paragraph>
    </StyledContainer>
  </StyledWrapper>
);

export default Comment;
