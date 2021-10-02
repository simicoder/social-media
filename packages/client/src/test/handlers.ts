import { Request, Response } from 'express';
import { rest } from 'msw';
import { postsRes, userRes } from './data';

export const handlers = [
  rest.post('http://localhost/api/user/signin', (req: Request, res: Response, ctx) => {
    if (req.body.email == userRes.result.email) {
      return res(ctx.json(userRes));
    }

    return res(ctx.status(404), ctx.json({ message: "User doesn't exist" }));
  }),

  rest.post('http://localhost/api/user/signup', (req: Request, res: Response, ctx) => {
    if (req.body.email == userRes.result.email) {
      return res(ctx.status(404), ctx.json({ message: 'User already exists' }));
    }
    return res(ctx.json(userRes), ctx.delay(150));
  }),

  rest.get('http://localhost/api/user/posts', (req: Request, res: Response, ctx) =>
    res(ctx.json(postsRes)),
  ),

  rest.post(
    'http://localhost/api/user/posts/',
    (req: Request, res: Response, ctx) => {
      const postRes = {
        creatorImage:
          'https://res.cloudinary.com/social-media-simi/image/upload/v1622739072/hbl8nlsm8mvrqbklqxnd.png',
        likes: [],
        createdAt: '2021-06-03T16:54:04.225Z',
        _id: '60b9092c4e5ee20015ff7323',
        title: req.body.title,
        description: req.body.description,
        creatorName: req.body.creatorName,
        creator: '60b908814e5ee20015ff7332',
        selectedFile:
          'https://res.cloudinary.com/social-media-simi/image/upload/v1622739243/s8pi1wetwqiv36qg9c3z.png',
        cloudinaryId: 's8pi1wetwqiv36qg9c3z',
        comments: [
          {
            creatorImage:
              'https://lh3.googleusercontent.com/a-/AOh14GgXwPeTGElOol13877EYgAlpL6xA69_i3MEJ6KfcQ=s96-c',
            _id: '60d383ac1c99adcc146e1800',
            text: 'hello',
            creator: '106082252769044628339',
            creatorName: 'Szymon Popielarz',
            created: '2021-06-23T18:55:40.239Z',
          },
        ],
        __v: 6,
      };

      return res(ctx.json(postRes));
    },

    // if (req.body.email == userRes.result.email) {
    //   return res(ctx.status(404), ctx.json({ message: 'User already exists' }));
    // }
  ),
];
