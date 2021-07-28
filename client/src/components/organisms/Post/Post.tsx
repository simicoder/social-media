import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { likePost, deletePost } from '../../../redux/actions/posts';
import { LikeIcon } from '../../atoms/LikeIcon/LikeIcon';
import { Button } from '../../atoms/Button/Button';
import { ProfileImage } from '../../atoms/ProfileImage/ProfileImage';
import { CommentForm } from '../../molecules/CommentForm/CommentForm';
import { Comments } from '../../molecules/Comments/Comments';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { IPost } from '../../../types/IPost';
import {
  StyledWrapper,
  StyledImg,
  StyledTitle,
  StyledTitleContainer,
  StyledHeaderContainer,
  StyledLikeButtonContainer,
  StyledCreatorContainer,
  StyledCreatorTag,
} from './Post.styled';
import { RootState } from '../../../redux/store';

interface IProps {
  post: IPost;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Post = ({ post, setCurrentId, setIsUpdate }: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.data);

  const updatePost = () => {
    setCurrentId(post._id);
    setIsUpdate(true);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <LikeIcon aria-label="like" disabled={!user?.result} isActive={false} />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <LikeIcon aria-label="like" disabled={!user?.result} isActive={true} />
          &nbsp;
          {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <LikeIcon aria-label="like" disabled={!user?.result} isActive={true} />
        &nbsp;Like
      </>
    );
  };

  return (
    <StyledWrapper>
      <StyledHeaderContainer>
        <StyledCreatorContainer>
          <ProfileImage alt="postAvatar" src={post.creatorImage} />
          <StyledCreatorTag data-testid="creatorName">{post.creatorName}</StyledCreatorTag>
        </StyledCreatorContainer>
        <p>{moment(post.createdAt).fromNow()}</p>
      </StyledHeaderContainer>

      <StyledImg src={post.selectedFile} alt="postImage" />

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
        <Button onClick={updatePost}>update</Button>
      )}
    </StyledWrapper>
  );
};
