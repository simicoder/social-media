import React, { useState } from 'react';
import UserPageTemplate from './UserPageTemplate';
import GlobalStyle from '../theme/GlobalStyle';
import PostForm from '../components/organisms/PostForm/PostForm';

const AddPostTemplate: React.FC = () => {
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
export default AddPostTemplate;
