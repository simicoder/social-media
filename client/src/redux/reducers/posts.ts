import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../actionTypes';
import { IPost } from '../../types/IPost';

interface IAction {
  type: typeof LIKE | typeof CREATE | typeof UPDATE;
  payload: IPost;
}

interface IActionFetchAll {
  type: typeof FETCH_ALL;
  payload: IPost[];
}

interface IActionDelete {
  type: typeof DELETE;
  payload: number;
}

type Action = IAction | IActionFetchAll | IActionDelete;

export const postsReducer = (posts: IPost[] = [], action: Action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [...action.payload];
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
