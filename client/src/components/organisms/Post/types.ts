import { IComments } from '../../molecules/Comments/types';

export interface IProps {
  post: IPost;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPost {
  title: string;
  description: string;
  creatorName: string;
  creator: string;
  creatorImage: string;
  selectedFile: string;
  createdAt: string;
  likes: Array<string>;
  _id: number;
  comments: Array<IComments>;
}
