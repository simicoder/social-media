import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import useWindowWidth from '../../../utils/useWindowWidth';
import Icon from '../../atoms/Icon/Icon';
import removeIcon from '../../../assets/Icons/removeIcon.svg';
import addIcon from '../../../assets/Icons/addIcon.svg';

const StyledFileInput = styled.input`
  display: none;
`;

const StyledFileButton = styled.button`
  margin: 10px;
  background-color: transparent;
  transition: all 0.2s;
  border: none;

  :hover {
    transform: scale(1.05);
  }
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.button};
`;

const StyledImg = styled.div<{ src: string }>`
  margin-top: 10px;
  background: no-repeat 50% 50%/90% 90% url(${({ src }) => src});
  width: 300px;
  height: 300px;
  border-radius: 2px;
  border: none;
`;

const StyledImageCropper = styled.div`
  margin-top: 20px;
`;

interface IPropsInput {
  handleImage: React.ChangeEventHandler<HTMLInputElement>;
  croppie: any;
  data: IData;
}

interface IData {
  selectedFile: Blob;
  urlSelectedFile: string;
}

interface IPropsCropperInput {
  defaultImg: string;
  setCroppie: Function;
  croppie: any;
}

export const Input: React.FC<IPropsInput> = ({ handleImage, croppie, data }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <>
      {data.selectedFile.size ? (
        <>
          <StyledImageCropper id="imageCropper" />
          <StyledButtonsWrapper>
            <Icon
              icon={removeIcon}
              size={56}
              type="button"
              onClick={() => {
                croppie.setZoom(croppie._currentZoom - 0.01);
              }}
            />
            <Icon
              icon={addIcon}
              size={56}
              type="button"
              onClick={() => {
                croppie.setZoom(croppie._currentZoom + 0.01);
              }}
            />
          </StyledButtonsWrapper>
        </>
      ) : (
        <StyledFileButton
          onClick={() => {
            fileInput.current && fileInput.current.click();
          }}
        >
          <StyledImg src={data.urlSelectedFile} />
          <StyledFileInput
            data-testid="input"
            ref={fileInput}
            type="file"
            required
            name="selectedFile"
            accept=".jpg, .jpeg, .png"
            onChange={handleImage}
          />
        </StyledFileButton>
      )}
    </>
  );
};

const CropperInput: React.FC<IPropsCropperInput> = ({ defaultImg, setCroppie, croppie }) => {
  const windowWidth = useWindowWidth();

  const initialState = {
    selectedFile: new Blob(),
    urlSelectedFile: defaultImg,
  };

  const [data, setData] = useState(initialState);

  const handleImage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      files: Array<Blob>;
    };
    if (target.files[0]) {
      const oFReader = new FileReader();
      oFReader.readAsDataURL(target.files[0]);

      oFReader.onload = (oFREvent: any) => {
        setData({
          selectedFile: target.files[0],
          urlSelectedFile: oFREvent.target.result,
        });

        const el = document.getElementById('imageCropper');
        if (el) {
          const croppieInstance: any = new Croppie(el, {
            enableExif: true,
            viewport: {
              height: windowWidth < 1024 ? 240 : 400,
              width: windowWidth < 1024 ? 240 : 400,
            },
            boundary: {
              height: windowWidth < 1024 ? 270 : 440,
              width: windowWidth < 1024 ? 270 : 440,
            },
          });
          croppieInstance.bind({
            url: oFREvent.target.result,
          });
          setCroppie(croppieInstance);
        }
      };
    }
  };

  return <Input handleImage={handleImage} croppie={croppie} data={data} />;
};

export default CropperInput;
