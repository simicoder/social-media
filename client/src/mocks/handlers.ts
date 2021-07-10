import { rest } from 'msw';

export const handlers = [
  rest.post('http://localhost:5000/user/signin', (req, res, ctx) => {
    const userRes = {
      result: {
        _id: '60b8e01d4e5ee20015ff7314',
        email: 'admin@gmail.com',
        password: '$2a$12$.G/HTTYUUI/ivl3w2xA/mOQMc2b9kuNRJvoVCIkrkyS09ARol/zK6',
        name: 'admin',
        imageUrl:
          'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
        cloudinaryId: 'jacdcws6xcvedhkaf62u',
        __v: 0,
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjBiOGUwMWQ0ZTVlZTIwMDE1ZmY3MzE0IiwiaWF0IjoxNjI1NjU1NjI4LCJleHAiOjE2MjU2NTkyMjh9.XCMTOWiP6_cDjVOVsemFLjdx73Yl78RJVhOtuSDBAwA',
    };

    if ((req as any).body.email == userRes.result.email) {
      return res(ctx.json(userRes), ctx.delay(150));
    }

    return res(ctx.status(404), ctx.json({ message: "User doesn't exist" }));
  }),
  rest.post('http://localhost:5000/user/signup', (req, res, ctx) => {
    const userRes = {
      result: {
        _id: '60b8e01d4e5ee20015ff7314',
        email: 'admin@gmail.com',
        password: '$2a$12$.G/HTTYUUI/ivl3w2xA/mOQMc2b9kuNRJvoVCIkrkyS09ARol/zK6',
        name: 'admin',
        imageUrl:
          'https://res.cloudinary.com/social-media-simi/image/upload/v1622728732/jacdcws6xcvedhkaf62u.png',
        cloudinaryId: 'jacdcws6xcvedhkaf62u',
        __v: 0,
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNjBiOGUwMWQ0ZTVlZTIwMDE1ZmY3MzE0IiwiaWF0IjoxNjI1NjU1NjI4LCJleHAiOjE2MjU2NTkyMjh9.XCMTOWiP6_cDjVOVsemFLjdx73Yl78RJVhOtuSDBAwA',
    };

    if ((req as any).body.email == userRes.result.email) {
      return res(ctx.status(404), ctx.json({ message: 'Something went wrong' }));
    }
    return res(ctx.json(userRes), ctx.delay(150));
  }),
];
