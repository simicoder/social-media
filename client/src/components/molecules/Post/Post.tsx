import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { likePost, deletePost } from '../../../actions/posts';
import LikeIcon from '../../atoms/LikeIcon/LikeIcon';
import Button from '../../atoms/Button/Button';
import { hostUrl } from '../../../constants/url';
import ProfileImage from '../../atoms/ProfileImage/ProfileImage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  min-height: 750px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.itemsBackground};
  margin: 10px 0 50px;
`;

const StyledImg = styled.div<{ src: string }>`
  margin-top: 10px;
  background: no-repeat 50% 50%/100% 100% url(${({ src }) => src});
  width: 550px;
  height: 550px;
  border-radius: 2px;
  border: none;
`;

const StyledTitle = styled.h1`
  color: #ffffff;
  background-color: #5a5a5a;
  padding: 5px;
  text-align: center;
  border-radius: 8px;
`;

const StyledLikeButton = styled.button`
  background: #5a5a5a;
  border: none;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  color: #a0a0a0;
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

const StyledDescriptionContainer = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  vertical-align: baseline;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
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
}

const Post: React.FC<IProps> = ({ post, setCurrentId, setIsUpdate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile')!);

  const updatePost = () => {
    setCurrentId(post._id);
    setIsUpdate(true);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <LikeIcon isActive={false} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <LikeIcon isActive={true} />
          &nbsp;
          {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <LikeIcon isActive={true} />
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
        <div>
          <StyledTitle>{post.title}</StyledTitle>
        </div>
        <StyledLikeButton disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </StyledLikeButton>
      </StyledTitleContainer>

      <StyledDescriptionContainer>{post.description}</StyledDescriptionContainer>

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
