import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserPageTemplate } from '../templates/UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';
import { Post } from '../components/organisms/Post/Post';
import { IPost } from '../components/organisms/Post/types';

export const SearchResult: React.FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const posts = useSelector((state: { posts: Array<IPost> }) => state.posts);
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <GlobalStyle />
      <UserPageTemplate>
        {posts[0] ? (
          posts.map((post: IPost, i: number) => (
            <Post key={i} post={post} setCurrentId={setCurrentId} setIsUpdate={setIsUpdate} />
          ))
        ) : (
          <h1>no results were found</h1>
        )}
      </UserPageTemplate>
    </>
  );
};
