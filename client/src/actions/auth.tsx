import { RouteComponentProps } from 'react-router-dom';
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin =
  (formData: FormData, router: RouteComponentProps['history'], setError: Function) =>
  async (dispatch: (arg0: { type: string; data: string }) => void) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      router.push('/');
    } catch (error) {
      setError('invalid data');
    }
  };

export const signup =
  (formData: FormData, router: RouteComponentProps['history'], setError: Function) =>
  async (dispatch: (arg0: { type: string; data: string }) => void) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      router.push('/');
    } catch (error) {
      setError('User already exists');
    }
  };
