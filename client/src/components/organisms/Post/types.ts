export interface IProps {
  post: IPost;
  setCurrentId: Function;
  setIsUpdate: Function;
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
  comments: any;
}
