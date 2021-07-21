import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Croppie from 'croppie';
import { createPost, updatePost } from '../../../actions/posts';
import uploadFileIcon from '../../../assets/Icons/uploadFileIcon.svg';
import { TextInput } from '../../atoms/TextInput/TextInput';
import { Button } from '../../atoms/Button/Button';
import { Textarea } from '../../atoms/Textarea/Textarea';
import { CropperInput } from '../../molecules/CropperInput/CropperInput';
import { IProps, IPostData } from './types';
import { IPost } from '../Post/types';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.itemsBackground};
  width: 550px;
  min-height: 500px;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 5px;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const StyledTitle = styled.h1`
  font-weight: 100;
`;

const initialState = {
  title: '',
  description: '',
};

export const PostForm: React.FC<IProps> = ({ currentId, setCurrentId, setIsUpdate }) => {
  const [postData, setPostData] = useState<IPostData>(initialState);
  const [croppie, setCroppie] = useState<Croppie | null>(null);

  const post: IPost | null | undefined = useSelector((state: { posts: Array<IPost> }) =>
    currentId ? state.posts.find((postItem: IPost) => postItem._id === currentId) : null,
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: any) => state.auth.data);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', description: '' });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (croppie !== null && postData.title && user.result.name) {
      croppie
        .result({
          type: 'blob',
          size: {
            width: 900,
            height: 900,
          },
        })
        .then((blob: Blob) => {
          const formData = new FormData();
          formData.append('title', postData.title);
          formData.append('description', postData.description);
          formData.append('creatorName', user.result.name);
          formData.append('creatorImage', user.result.imageUrl);
          formData.append('selectedFile', blob);
          if (currentId === 0) {
            dispatch(createPost(formData));
            clear();
          } else {
            dispatch(updatePost(currentId, formData));
            clear();
          }

          history.push('/');
          setIsUpdate && setIsUpdate(false);
        });
    }
  };

  if (!user?.result.name) {
    return (
      <div>
        <h1>Please Sign In to publish data</h1>
      </div>
    );
  }

  return (
    <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
      <StyledTitle>{post ? `Editing "${post.title}"` : 'Create a Post'}</StyledTitle>
      <TextInput
        type="text"
        maxLength={25}
        name="title"
        label="title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <Textarea
        name="description"
        placeholder="description"
        value={postData.description}
        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
      />
      <CropperInput
        defaultImg={post ? post.selectedFile : uploadFileIcon}
        setCroppie={setCroppie}
        croppie={croppie}
      />
      <Button type="submit">Submit</Button>
      <Button type="reset" onClick={clear}>
        Clear
      </Button>
    </StyledForm>
  );
};
