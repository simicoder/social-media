import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testUtils';
import { Input } from './CropperInput';

it('uploading normal image', async () => {
  const handleImageMock = jest.fn();
  const fakeData = {
    selectedFile: new Blob(),
    urlSelectedFile:
      'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
  };

  render(<Input handleImage={handleImageMock} croppie={''} data={fakeData} />);

  const file = new File(['hello'], 'hello.png', { type: 'image/png' });

  const input = screen.getByTestId('cropperInput');

  userEvent.upload(input, file);
});
