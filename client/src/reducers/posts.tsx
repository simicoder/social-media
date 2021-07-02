import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import { IPost } from '../components/organisms/Post/Post';

interface IAction {
  type: string;
  payload: IPost;
}

interface IActionDelete {
  type: typeof DELETE;
  payload: number;
}

type Action = IAction | IActionDelete;

export default (posts = [], action: Action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post: IPost) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [action.payload, ...posts];
    case UPDATE:
      return posts.map((post: IPost) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post: IPost) => post._id !== action.payload);
    default:
      return posts;
  }
};
