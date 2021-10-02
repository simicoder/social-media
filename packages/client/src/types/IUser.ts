export interface IUser {
  result: {
    name: string;
    email: string;
    id: string;
    _id: string;
    imageUrl: string;
    cloudinaryId: string;
    googleId?: string;
  };
}
