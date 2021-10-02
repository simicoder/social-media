import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserPageTemplate } from '../templates/UserPageTemplate';
import { GlobalStyle } from '../theme/GlobalStyle';
import { Post } from '../components/organisms/Post/Post';
import { IPost } from '../types/IPost';
import { RootState } from '../redux/store';

export const SearchResult = () => {
  const [currentId, setCurrentId] = useState(0);
  const posts = useSelector((state: RootState) => state.posts);
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <GlobalStyle />
      <UserPageTemplate>
        {posts[0] ? (
          posts.map((post: IPost) => (
            <Post
              key={post._id}
              post={post}
              setCurrentId={setCurrentId}
              setIsUpdate={setIsUpdate}
            />
          ))
        ) : (
          <h1>no results were found</h1>
        )}
      </UserPageTemplate>
    </>
  );
};
