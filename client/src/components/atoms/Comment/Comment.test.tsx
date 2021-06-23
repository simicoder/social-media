import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import Comment from './Comment';

it('render basic comment', async () => {
  const fakeComment = {
    text: 'text of comment',
    creatorName: 'admin',
    creator: '43243',
    created: new Date(),
    creatorImage:
      'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
  };

  render(<Comment comment={fakeComment} />);

  expect(screen.getByText(fakeComment.text)).toBeInTheDocument();
  expect(screen.getByText(fakeComment.creatorName)).toBeInTheDocument();
  expect(screen.getByText(moment(fakeComment.created).fromNow())).toBeInTheDocument();

  const creatorImage = screen.getByRole('img');
  expect(creatorImage).toHaveAttribute('src', fakeComment.creatorImage);
  expect(creatorImage).toHaveAttribute('alt', 'avatar');
});
