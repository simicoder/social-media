import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 7px;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  background-color: ${({ theme }) => theme.background};
  padding: 5px;
  border-radius: 10px;
`;

export const StyledTime = styled.p`
  font-size: 0.8em;
  margin: 0;
  color: ${({ theme }) => theme.lightColor};
`;
