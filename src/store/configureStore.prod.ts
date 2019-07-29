import {createStore, applyMiddleware, Store, AnyAction, compose} from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import history from "../utils/history";
import rootReducer, {GlobalState} from "../ducks";

const middleware = applyMiddleware(thunk as ThunkMiddleware, routerMiddleware(history));

const initialState = {};

export default function configureStore(): Store<GlobalState> {
    return createStore(
        rootReducer as any,
        initialState,
        middleware
    ) as Store<GlobalState>;
}
