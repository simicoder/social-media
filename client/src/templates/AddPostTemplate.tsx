import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
