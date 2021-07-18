import React, { useState } from 'react';
import { UserPageTemplate } from '../templates/UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';
import { PostForm } from '../components/organisms/PostForm/PostForm';

export const AddPost: React.FC = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <>
      <GlobalStyle />
      <UserPageTemplate>
        <PostForm currentId={currentId} setCurrentId={setCurrentId} setIsUpdate={null} />
      </UserPageTemplate>
    </>
  );
};
