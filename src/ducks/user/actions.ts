import { Action, Dispatch } from 'redux';
import * as ActionTypes from './constants';
import * as api from '../../utils/api';
import { GlobalState } from '../index';
import { ThunkAction } from 'redux-thunk';

export const fetchAll = (): ThunkAction<void, GlobalState, null, Action> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.FETCH_USERS_REQUEST });

    try {
      const res = await api.getUsers();
      return dispatch({
        type: ActionTypes.FETCH_USERS_SUCCESS,
        payload: { users: res.data }
      });
    } catch (err) {
      return dispatch({
        type: ActionTypes.FETCH_USERS_FAILURE,
        payload: { error: err.message }
      });
    }
  };

export const addUser = (name: string): ThunkAction<void, GlobalState, null, Action> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.ADD_USER_REQUEST });

    try {
      const res = await api.postUser(name);
      return dispatch({
        type: ActionTypes.ADD_USER_SUCCESS,
        payload: {
          user: res.data
        }
      })
    } catch (err) {
      return dispatch({
        type: ActionTypes.ADD_USER_FAILURE,
        payload: { error: err.message }
      });
    }
  };
