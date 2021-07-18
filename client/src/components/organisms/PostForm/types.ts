export interface IProps {
  currentId: number;
  setCurrentId: Function;
  setIsUpdate: Function | null;
}

export interface IPostData {
  title: string;
  description: string;
}
