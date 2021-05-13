import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { likePost, deletePost } from '../../../actions/posts';
import LikeIcon from '../../atoms/LikeIcon/LikeIcon';
import Button from '../../atoms/Button/Button';
import { hostUrl } from '../../../constants/url';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';
import CommentForm from '../../molecules/CommentForm/CommentForm';
import Comments from '../../molecules/Comments/Comments';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  min-height: 630px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.itemsBackground};
  margin: 10px 0 50px;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const StyledImg = styled.img<{ src: string }>`
  margin-top: 10px;
  background: no-repeat 50% 50%/100% 100% url(${({ src }) => src});
  max-width: 100%;
  height: auto;
  border-radius: 2px;
  border: none;
  display: flex;
`;

const StyledTitle = styled.h1`
  color: #ffffff;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  vertical-align: baseline;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 8px;
  font-size: 1em;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const StyledLikeButtonContainer = styled.div`
  background: #5a5a5a;
  border: none;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  color: #a0a0a0;
  padding: 5px;
`;

const StyledCreatorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StyledCreatorTag = styled.div`
  background: #5a5a5a;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: start;
  margin-left: 10px;
`;

interface IProps {
  post: IPost;
  setCurrentId: Function;
  setIsUpdate: Function;
}

export interface IPost {
  title: string;
  description: string;
  creatorName: string;
  creator: string;
  selectedFile: Blob;
  createdAt: string;
  likes: Array<string>;
  _id: number;
  comments: any;
}

const Post: React.FC<IProps> = ({ post, setCurrentId, setIsUpdate }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile')!);

  const updatePost = () => {
    setCurrentId(post._id);
    setIsUpdate(true);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <LikeIcon disabled={!user?.result} isActive={false} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <LikeIcon disabled={!user?.result} isActive={true} />
          &nbsp;
          {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <LikeIcon disabled={!user?.result} isActive={true} />
        &nbsp;Like
      </>
    );
  };

  return (
    <StyledWrapper>
      <StyledHeaderContainer>
        <StyledCreatorContainer>
          <ProfileImage alt="avatar" src={`${hostUrl}profile/${post.creator}`} />
          <StyledCreatorTag>{post.creatorName}</StyledCreatorTag>
        </StyledCreatorContainer>
        <p>{moment(post.createdAt).fromNow()}</p>
      </StyledHeaderContainer>

      <StyledImg src={hostUrl + post.selectedFile} />

      <StyledTitleContainer>
        <StyledTitle>{post.title}</StyledTitle>
        <StyledLikeButtonContainer onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </StyledLikeButtonContainer>
      </StyledTitleContainer>

      <Paragraph>{post.description}</Paragraph>

      <CommentForm id={post._id} />

      {post.comments.length > 0 && <Comments comments={post.comments} />}

      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
      )}

      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div>
          <Button onClick={updatePost}>update</Button>
        </div>
      )}
    </StyledWrapper>
  );
};

export default Post;
