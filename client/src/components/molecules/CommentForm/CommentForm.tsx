import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { commentPost } from '../../../actions/posts';
import { ButtonIcon } from '../../atoms/ButtonIcon/ButtonIcon';
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

interface IPropsForm {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

interface IProps {
  id: number;
}

export const Form: React.FC<IPropsForm> = ({ handleSubmit }) => (
  <StyledForm onSubmit={handleSubmit} noValidate autoComplete="off">
    <StyledInput data-testid="input" name="text" placeholder="Comment" required />
    <ButtonIcon data-testid="submit" type="submit" icon={sendIcon} size={35} />
  </StyledForm>
);

export const CommentForm: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile')!);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & { text: { value: string } };

    const text = target.text.value;

    if (text) {
      const creatorName = user.result.name;
      const creatorImage = user.result.imageUrl;

      dispatch(commentPost(id, { text, creatorName, creatorImage }));
      target.text.value = '';
    }
  };

  return <Form handleSubmit={handleSubmit} />;
};
