export interface IPropsInput {
  handleImage: React.ChangeEventHandler<HTMLInputElement>;
  croppie: any;
  data: IData;
}

export interface IData {
  selectedFile: Blob;
  urlSelectedFile: string;
}

export interface IPropsCropperInput {
  defaultImg: string;
  setCroppie: Function;
  croppie: any;
}
