import axios from 'axios';
import { hostUrl } from '../constants/url';

const API = axios.create({ baseURL: hostUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const searchPosts = (text: string) => API.get(`/posts/search/${text}`);
export const createPost = (newPost: FormData) => API.post('/posts', newPost);
export const likePost = (id: number, ...rest: any) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: number, updatedPost: FormData) =>
  API.patch(`/posts/${id}`, updatedPost);
export const commentPost = (id: number, comment: Object) =>
  API.patch(`/posts/comment/${id}`, comment);
export const deletePost = (id: number) => API.delete(`/posts/${id}`);

export const signIn = (formData: FormData) => API.post('/user/signin', formData);
export const signUp = (formData: FormData) => API.post('/user/signup', formData);
