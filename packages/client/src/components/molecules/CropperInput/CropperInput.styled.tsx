import styled from 'styled-components';

export const StyledFileInput = styled.input`
  display: none;
`;

export const StyledFileButton = styled.button`
  margin: 10px;
  background-color: transparent;
  transition: all 0.2s;
  border: none;

  :hover {
    transform: scale(1.05);
  }
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.button};
`;

export const StyledImg = styled.div<{ src: string }>`
  margin-top: 10px;
  background: no-repeat 50% 50%/90% 90% url(${({ src }) => src});
  width: 300px;
  height: 300px;
  border-radius: 2px;
  border: none;
`;

export const StyledImageCropper = styled.div`
  margin-top: 20px;
`;
