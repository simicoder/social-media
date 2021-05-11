import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getPosts =
  () => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    try {
      const { data } = await api.fetchPosts();

      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const searchPosts =
  (text: string) => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    try {
      const { data } = await api.searchPosts(text);

      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost =
  (post: FormData) => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    try {
      const { data } = await api.createPost(post);

      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updatePost =
  (id: number, post: FormData) =>
  async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const likePost =
  (id: number) => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    const user = JSON.parse(localStorage.getItem('profile')!);

    try {
      const { data } = await api.likePost(id, user?.token);

      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost =
  (id: number) => async (dispatch: (arg0: { type: string; payload: number }) => void) => {
    try {
      await await api.deletePost(id);

      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
