import * as actionType from '../actionTypes';
import { IUser } from '../../types/IUser';

interface IState {
  data: IUser | null | undefined;
}

export const authReducer = (
  state: IState = { data: null },
  action: { type: string; data?: IUser },
) => {
  switch (action.type) {
    case actionType.AUTH:
      return { ...state, data: action?.data, loading: false, errors: null };
    case actionType.LOGOUT:
      return { ...state, data: null, loading: false, errors: null };
    case actionType.CHECK_TOKEN:
      return { ...state, data: action?.data, loading: false, errors: action?.data };
    default:
      return state;
  }
};
