import React, { useState } from 'react';
import styled from 'styled-components';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import useWindowWidth from '../../../utils/useWindowWidth';

const StyledFileInput = styled.input`
  display: none;
`;

const StyledFileLabel = styled.label`
  margin: 10px;
  transition: all 0.2s;

  :hover {
    transform: scale(1.1);
  }
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
  setState: Function;
}

const CropperInput: React.FC<IProps> = ({ defaultImg, setState }) => {
  const initialState = {
    selectedFile: new Blob(),
    urlSelectedFile: defaultImg,
  };

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
          const croppieInstance = new Croppie(el, {
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
          setState(croppieInstance);
        }
      };
    }
  };

  return (
    <>
      {data.selectedFile.size ? (
        <StyledImageCropper id="imageCropper"></StyledImageCropper>
      ) : (
        <StyledFileLabel>
          <StyledImg src={data.urlSelectedFile} />
          <StyledFileInput
            type="file"
            required
            name="selectedFile"
            accept=".jpg, .jpeg, .png"
            onChange={handleImage}
          />
        </StyledFileLabel>
      )}
    </>
  );
};
export default CropperInput;
