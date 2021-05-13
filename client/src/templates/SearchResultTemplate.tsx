import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserPageTemplate from './UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';
import Post, { IPost } from '../components/organisms/Post/Post';

const SearchResultTemplate: React.FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const posts = useSelector((state: any) => state.posts);
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
export default SearchResultTemplate;
