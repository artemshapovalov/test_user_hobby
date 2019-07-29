import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../utils/history';
import configureStore from '../../store/configureStore';

import Home from '../home/Home';
import { Store } from 'redux';

import './App.scss';

interface AppProps {}

const store: Store = configureStore();

export default function({  }: AppProps) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Home />
      </Router>
    </Provider>
  );
}
