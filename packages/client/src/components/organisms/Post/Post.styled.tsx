import styled from 'styled-components';

export const StyledWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  min-height: 630px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.itemsBackground};
  margin: 10px 0 50px;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

export const StyledImg = styled.img<{ src: string }>`
  margin-top: 10px;
  background: no-repeat 50% 50%/100% 100% url(${({ src }) => src});
  max-width: 100%;
  height: auto;
  border-radius: 2px;
  border: none;
  display: flex;
`;

export const StyledTitle = styled.span`
  color: #ffffff;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  vertical-align: baseline;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

export const StyledLikeButtonContainer = styled.div`
  border: none;
  height: 50px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.lightColor};
  padding: 0 5px 0 5px;
  margin: 2px;
`;

export const StyledCreatorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const StyledCreatorTag = styled.div`
  background: #5a5a5a;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: start;
  margin-left: 10px;
  margin-right: 10px;
`;
