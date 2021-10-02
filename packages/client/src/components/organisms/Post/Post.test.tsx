import React from 'react';
import moment from 'moment';
import { render, screen } from '../../../utils/testUtils';
import { Post } from './Post';
import { IPost } from '../../../types/IPost';

const mocksetCurrentId = jest.fn();
const mocksetsetIsUpdate = jest.fn();

const fakePost: IPost = {
  title: 'title',
  description: 'description',
  creatorName: 'admin',
  creator: '3244323432324343',
  creatorImage:
    'https://res.cloudinary.com/social-media-simi/image/upload/v1622739072/hbl8nlsm8mvrqbklqxnd.png',
  selectedFile:
    'https://res.cloudinary.com/social-media-simi/image/upload/v1622739243/s8pi1wetwqiv36qg9c3z.png',
  createdAt: '2021-06-03T16:54:04.225+00:00',
  likes: ['4235435435435', '4235435435421'],
  _id: 4324343243434,
  comments: [
    {
      text: 'text of comment',
      creatorName: 'admin',
      creator: '43243',
      created: new Date(),
      creatorImage:
        'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
      _id: '7dsa6789d7sa9d7s',
    },
  ],
};

it('render basic post', async () => {
  render(<Post post={fakePost} setCurrentId={mocksetCurrentId} setIsUpdate={mocksetsetIsUpdate} />);

  expect(screen.getByText(fakePost.title)).toBeInTheDocument();
  expect(screen.getByText(fakePost.description)).toBeInTheDocument();
  expect(screen.getByTestId('creatorName')).toBeInTheDocument();
  expect(screen.getByText(moment(fakePost.createdAt).fromNow())).toBeInTheDocument();

  const creatorImage = screen.getByAltText('postAvatar');
  expect(creatorImage).toHaveAttribute('src', fakePost.creatorImage);
});
