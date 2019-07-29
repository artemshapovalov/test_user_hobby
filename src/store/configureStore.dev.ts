import { Store, createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import history from '../utils/history';
import rootReducer, { GlobalState } from '../ducks';

declare var window: ExtendedWindow;

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

const middleware = applyMiddleware(
  thunk as ThunkMiddleware,
  routerMiddleware(history)
);

const initialState = {};

export default function configureStore(): Store<GlobalState> {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer as any, initialState, composeEnhancers(middleware)) as Store<
    GlobalState
  >;
}
