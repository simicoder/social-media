import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import { IPost } from '../components/organisms/Post/Post';

export default (posts = [], action: { type: string; payload: { _id: number } & number }) => {
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
