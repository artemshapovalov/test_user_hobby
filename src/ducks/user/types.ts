import { ThunkAction } from 'redux-thunk';
import { GlobalState } from '../index';
import { Action } from 'redux';

export interface User {
  id: string;
  name: string;
}

export interface UserState {
  users: User[];
  error: string;
  loaded: boolean;
}

export type FetchAllUserAction = () => ThunkAction<void, GlobalState, null, Action<any>>;
export type AddUserAction = (name: string) => ThunkAction<void, GlobalState, null, Action<any>>;
