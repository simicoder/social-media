import axios from 'axios';
import { hostUrl } from '../constants/url';

const API = axios.create({ baseURL: hostUrl, withCredentials: true });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = localStorage.getItem('token')!;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const searchPosts = (text: string) => API.get(`/posts/search/${text}`);
export const createPost = (newPost: FormData) => API.post('/posts', newPost);
export const likePost = (id: number) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: number, updatedPost: FormData) =>
  API.patch(`/posts/${id}`, updatedPost);
export const commentPost = (id: number, comment: Object) =>
  API.patch(`/posts/comment/${id}`, comment);
export const deletePost = (id: number) => API.delete(`/posts/${id}`);

export const signIn = (formData: FormData) => API.post('/user/signin', formData);
export const signUp = (formData: FormData) => API.post('/user/signup', formData);
export const checkToken = () => API.post('/user/checktoken');
export const signOut = () => API.post('/user/signout');
