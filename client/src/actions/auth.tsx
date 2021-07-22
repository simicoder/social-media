import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin =
  (formData: FormData, router: RouteComponentProps['history']) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      router.push('/');
    } catch (error) {
      throw error.response.data.message;
    }
  };

export const signup =
  (formData: FormData, router: RouteComponentProps['history']) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      router.push('/');
    } catch (error) {
      throw error.response.data.message;
    }
  };

export const signout = (router: RouteComponentProps['history']) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.signOut();

    dispatch({ type: LOGOUT });

    router.push('/auth');
  } catch (error) {
    throw error.response.data.message;
  }
};

export const checktoken = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.checkToken();

    dispatch({ type: AUTH, data });
  } catch (error) {
    throw error.response.data.message;
  }
};
