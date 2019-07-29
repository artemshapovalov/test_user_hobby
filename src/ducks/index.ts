import { combineReducers, Dispatch } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import app, { AppState } from './app/reducer';
import user from './user/reducer';
import hobby from './hobby/reducer';
import { UserState } from './user/types';
import { HobbyState } from './hobby/types';

// The top-level state object
export interface GlobalState {
  routing: RouterState;
  app: AppState;
  user: UserState;
  hobby: HobbyState;
}

export type Action = (dispatch: Dispatch, getState: () => GlobalState) => any;

export default combineReducers<GlobalState>({
  routing: routerReducer,
  app,
  user,
  hobby
});
