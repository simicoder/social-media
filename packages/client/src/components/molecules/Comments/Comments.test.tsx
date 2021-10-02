import React from 'react';
import moment from 'moment';
import { render, screen } from '../../../utils/testUtils';
import { Comments } from './Comments';

it('displaying normal comments', async () => {
  const fakeComments = [
    {
      text: 'text of comment',
      creatorName: 'admin',
      creator: '43243',
      created: new Date(),
      creatorImage:
        'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
      _id: '324325325trgfdgrt36',
    },
    {
      text: 'text of comment2',
      creatorName: 'admin2',
      creator: '432432',
      created: new Date(),
      creatorImage:
        'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
      _id: '3232deaes78977',
    },
  ];

  render(<Comments comments={fakeComments} />);

  expect(screen.getAllByText(fakeComments[0].text)[0]).toBeInTheDocument();
  expect(screen.getAllByText(fakeComments[0].creatorName)[0]).toBeInTheDocument();
  expect(screen.getAllByText(moment(fakeComments[0].created).fromNow())[0]).toBeInTheDocument();

  expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', fakeComments[0].creatorImage);
  expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'avatar');

  expect(screen.getAllByText(fakeComments[1].text)[0]).toBeInTheDocument();
  expect(screen.getAllByText(fakeComments[1].creatorName)[0]).toBeInTheDocument();
  expect(screen.getAllByText(moment(fakeComments[1].created).fromNow())[0]).toBeInTheDocument();

  expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', fakeComments[1].creatorImage);
  expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'avatar');
});
