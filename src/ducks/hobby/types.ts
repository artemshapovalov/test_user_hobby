import { ThunkAction } from 'redux-thunk';
import { GlobalState } from '../index';
import { Action } from 'redux';

export interface Hobby {
  id?: string;
  userId: string;
  name: string;
  passion: string;
  year: string;
}

export interface HobbyState {
  hobbies: Hobby[];
  loaded: boolean;
  error: string;
}

export type FetchHobbiesByUserIdAction = (userId: string) => ThunkAction<void, GlobalState, null, Action<any>>;
export type AddHobbyAction = (hobby: Hobby) => ThunkAction<void, GlobalState, null, Action<any>>;
export type RemoveHobbyAction = (id: string) => ThunkAction<void, GlobalState, null, Action<any>>;
