import { combineReducers } from 'redux';

import { postsReducer as posts } from './posts';
import { authReducer } from './auth';

export const reducers = combineReducers({ posts, authReducer });
