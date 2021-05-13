import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserPageTemplate from './UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';
import Post, { IPost } from '../components/organisms/Post/Post';
import PostForm from '../components/organisms/PostForm/PostForm';

import { getPosts } from '../actions/posts';

const MainTemplate: React.FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts);
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
            {posts.map((post: IPost, i: number) => (
              <Post key={i} post={post} setCurrentId={setCurrentId} setIsUpdate={setIsUpdate} />
            ))}
          </>
        )}
      </UserPageTemplate>
    </>
  );
};
export default MainTemplate;
