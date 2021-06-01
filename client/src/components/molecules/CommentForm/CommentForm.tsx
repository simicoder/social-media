import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { commentPost } from '../../../actions/posts';
import Icon from '../../atoms/Icon/Icon';
import sendIcon from '../../../assets/Icons/sendIcon.svg';

const StyledForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 8px;
  border: solid 1px black;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  margin: 10px 0 10px 0;

  :focus {
    outline: solid 1px #535353;
  }
`;

interface IProps {
  id: number;
}

const CommentBar: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile')!);

  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    const text = e.target.text.value;

    if (text) {
      const creatorName = user.result.name;
      const creatorImage = user.result.imageUrl;

      dispatch(commentPost(id, { text, creatorName, creatorImage }));
      e.target.text.value = '';
    }
  };

  return (
    <StyledForm onSubmit={HandleSubmit} noValidate autoComplete="off">
      <StyledInput name="text" placeholder="Comment" />
      <Icon icon={sendIcon} size={35} />
    </StyledForm>
  );
};

export default CommentBar;
