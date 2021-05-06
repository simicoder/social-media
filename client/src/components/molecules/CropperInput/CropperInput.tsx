import React, { useState } from 'react';
import styled from 'styled-components';
import Croppie from 'croppie';
import 'croppie/croppie.css';

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
  background: no-repeat 50% 50%/90% 90% url(${({ src }) => src});
  width: 300px;
  height: 300px;
  border-radius: 2px;
  border: none;
`;

const StyledImageCropper = styled.div`
  padding: 20px;
`;

interface IProps {
  defaultImg: string;
  setState: Function;
}

const CropperInput: React.FC<IProps> = ({ defaultImg, setState }) => {
  const initialState = {
    selectedFile: '',
    urlSelectedFile: defaultImg,
  };

  const [data, setData] = useState(initialState);

  const handleImage = (e: any) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const oFReader = new FileReader();
      oFReader.readAsDataURL(e.target.files[0]);

      oFReader.onload = (oFREvent: any) => {
        setData({
          selectedFile: e.target.files[0],
          urlSelectedFile: oFREvent.target.result,
        });

        const el = document.getElementById('imageCropper');
        if (el) {
          const croppieInstance = new Croppie(el, {
            enableExif: true,
            viewport: {
              height: 450,
              width: 450,
            },
            boundary: {
              height: 500,
              width: 600,
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
      {data.selectedFile ? (
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
