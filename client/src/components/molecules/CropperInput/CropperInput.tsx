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

interface IProps {
  defaultImg: string;
  setCroppie: Function;
  croppie: any;
}

const CropperInput: React.FC<IProps> = ({ defaultImg, setCroppie, croppie }) => {
  const initialState = {
    selectedFile: new Blob(),
    urlSelectedFile: defaultImg,
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const windowWidth = useWindowWidth();

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
              height: windowWidth < 1024 ? 170 : 400,
              width: windowWidth < 1024 ? 170 : 400,
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

  return (
    <>
      {data.selectedFile.size ? (
        <>
          <StyledImageCropper id="imageCropper" />
          <StyledButtonsWrapper>
            <Icon
              icon={removeIcon}
              size={64}
              type="button"
              onClick={() => {
                croppie.setZoom(croppie._currentZoom - 0.01);
              }}
            />
            <Icon
              icon={addIcon}
              size={64}
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
export default CropperInput;
