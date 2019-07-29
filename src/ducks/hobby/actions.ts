import { Dispatch } from 'redux';
import * as ActionTypes from './constants';
import * as api from '../../utils/api';
import { Hobby } from './types';

export const fetchHobbiesByUserId = (userId: string) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.FETCH_HOBBY_REQUEST });

    try {
      const res = await api.getHobbiesByUserId(userId);
      return dispatch({
        type: ActionTypes.FETCH_HOBBY_SUCCESS,
        payload: { hobbies: res.data }
      });
    } catch (err) {
      return dispatch({
        type: ActionTypes.FETCH_HOBBY_FAILURE,
        payload: { error: err.message }
      });
    }
  };

export const addHobby = ({ id, name, passion, year, userId }: Hobby) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.ADD_HOBBY_REQUEST });

    try {
      const res = await api.postHobby({ id, name, passion, year, userId });
      return dispatch({
        type: ActionTypes.ADD_HOBBY_SUCCESS,
        payload: { hobby: res.data }
      });
    } catch (err) {
      return dispatch({
        type: ActionTypes.ADD_HOBBY_FAILURE,
        payload: { error: err.message }
      });
    }
  };

export const removeHobby = (id: string) =>
   async (dispatch: Dispatch) => {
     dispatch({ type: ActionTypes.REMOVE_HOBBY_REQUEST });

    try {
      const res = await api.deleteHobby(id);
      return dispatch({
        type: ActionTypes.REMOVE_HOBBY_SUCCESS,
        payload: { hobbyId: id }
      });
    } catch (err) {
      return dispatch({
        type: ActionTypes.REMOVE_HOBBY_FAILURE,
        payload: { error: err.message }
      });
    }
  };
