import styled from 'styled-components';

const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: ${({ theme }) => theme.active};
`;

export default Label;
