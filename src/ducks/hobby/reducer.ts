import { AnyAction } from 'redux';
import * as ActionTypes from './constants';
import { HobbyState } from './types';

export const initialHobbyState: HobbyState = {
  loaded: false,
  hobbies: [],
  error: ''
};

export default function reducer(
  state: HobbyState = initialHobbyState,
  action: AnyAction
): HobbyState {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.FETCH_HOBBY_SUCCESS:
      return {
        ...state,
        hobbies: payload.hobbies,
        loaded: true
      };
    case ActionTypes.ADD_HOBBY_SUCCESS:
      return {
        ...state,
        hobbies: [...state.hobbies, payload.hobby],
        loaded: true
      };
    case ActionTypes.REMOVE_HOBBY_SUCCESS:
      return {
        ...state,
        hobbies: state.hobbies.filter(hobby => hobby.id != payload.hobbyId),
        loaded: true
      };
    case ActionTypes.ADD_HOBBY_REQUEST:
    case ActionTypes.FETCH_HOBBY_REQUEST:
    case ActionTypes.REMOVE_HOBBY_REQUEST:
      return {
        ...state,
        loaded: false,
      };

    case ActionTypes.ADD_HOBBY_FAILURE:
    case ActionTypes.FETCH_HOBBY_FAILURE:
    case ActionTypes.REMOVE_HOBBY_FAILURE:
      return {
        ...state,
        loaded: true,
        error: payload
      };

    default:
      return state;
  }
}
