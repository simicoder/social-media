import styled from 'styled-components';

const TextInput = styled.input`
  font-family: inherit;
  width: 90%;
  border: 0;
  border-bottom: 2px solid grey;
  outline: 0;
  font-size: 1.3rem;
  color: white;
  padding: 10px 0;
  background: transparent;
  transition: all 0.2s;

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

  :-ms-input-placeholder {
    color: #fff;
  }

  ::-ms-input-placeholder {
    color: #fff;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default TextInput;
