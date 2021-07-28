import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPageTemplate } from '../templates/UserPageTemplate';
import { GlobalStyle } from '../theme/GlobalStyle';
import { Post } from '../components/organisms/Post/Post';
import { IPost } from '../types/IPost';
import { PostForm } from '../components/organisms/PostForm/PostForm';
import { getPosts } from '../redux/actions/posts';
import { RootState } from '../redux/store';

export const Main = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      <GlobalStyle />
      <UserPageTemplate>
        {isUpdate ? (
          <PostForm currentId={currentId} setCurrentId={setCurrentId} setIsUpdate={setIsUpdate} />
        ) : (
          <>
            {posts.map((post: IPost) => (
              <Post
                key={post._id}
                post={post}
                setCurrentId={setCurrentId}
                setIsUpdate={setIsUpdate}
              />
            ))}
          </>
        )}
      </UserPageTemplate>
    </>
  );
};
