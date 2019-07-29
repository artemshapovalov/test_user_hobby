import * as ActionTypes from './constants';
import { ActionsUnion, createAction } from '../action-helper';

export const AppActions = {
  init: () => createAction(ActionTypes.APP_INITIALIZED)
};

export type AppActions = ActionsUnion<typeof AppActions>;
