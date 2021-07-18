import styled from 'styled-components';

export const Textarea = styled.textarea`
  margin-top: 20px;
  font-family: inherit;
  width: 90%;
  height: 20vh;
  border: 0;
  border-bottom: 2px solid grey;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  background: transparent;
  transition: all 0.2s;
  resize: none;

  :focus {
    font-weight: 700;
    border-width: 3px;
    border-image: #3d5553;
    border-image-slice: 1;
    transform: scale(1.05);
  }

  ::placeholder {
    color: #fff;
    opacity: 1;
  }
`;
