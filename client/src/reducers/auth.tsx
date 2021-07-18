import * as actionType from '../constants/actionTypes';

interface IState {
  authData: FormData | null | undefined;
}

export const authReducer = (
  state: IState = { authData: null },
  action: { type: string; data?: FormData },
) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};
