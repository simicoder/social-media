export type IProps = {
  comments: Array<IComments>;
};

export interface IComments {
  text: String;
  creator: String;
  creatorName: String;
  creatorImage: string;
  created: Date;
}
