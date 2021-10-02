import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { commentPost } from '../../../redux/actions/posts';
import { ButtonIcon } from '../../atoms/ButtonIcon/ButtonIcon';
import sendIcon from '../../../assets/Icons/sendIcon.svg';
import { RootState } from '../../../redux/store';

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
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
}

interface IProps {
  id: number;
}

export const Form = ({ handleSubmit, handleChange, text }: IPropsForm) => (
  <StyledForm onSubmit={handleSubmit} noValidate autoComplete="off">
    <StyledInput
      data-testid="input"
      name="text"
      placeholder="Comment"
      onChange={handleChange}
      value={text}
      required
    />
    <ButtonIcon
      aria-label="send comment"
      data-testid="submit"
      type="submit"
      icon={sendIcon}
      size={35}
    />
  </StyledForm>
);

export const CommentForm = ({ id }: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.data);
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) setText(text);
  }, [text]);

  const handleChange = (e: { target: { value: string } }) => setText(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text && user) {
      const creatorName = user.result.name;
      const creatorImage = user.result.imageUrl;

      dispatch(commentPost(id, { text, creatorName, creatorImage }));
      setText('');
    }
  };

  return <Form handleSubmit={handleSubmit} handleChange={handleChange} text={text} />;
};
