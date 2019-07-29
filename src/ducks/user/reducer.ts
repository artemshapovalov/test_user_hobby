import { AnyAction } from 'redux';
import * as ActionTypes from './constants';
import { UserState } from './types';

const initialState: UserState = {
  loaded: false,
  users: [],
  error: ''
};

export default function reducer(
  state: UserState = initialState,
  action: AnyAction
): UserState {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        loaded: true
      };
    case ActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, payload.user],
        loaded: true
      };

    case ActionTypes.FETCH_USERS_REQUEST:
    case ActionTypes.ADD_USER_REQUEST:
      return {
        ...state,
        loaded: false
      };

    case ActionTypes.FETCH_USERS_FAILURE:
    case ActionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        loaded: true,
        error: payload
      };
    default:
      return state;
  }
}
