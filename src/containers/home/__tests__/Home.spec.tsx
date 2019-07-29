import * as React from "react";
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

import ConnectedHome, { Home } from '../Home';

function setup() {
  const initialState = {
    user: {},
    hobby: {}
  };
  const store: Store = mockStore(initialState);

  const enzymeWrapper = mount(
    <Provider store={store}>
      <ConnectedHome />
    </Provider>
  );

  return {
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Home', () => {
    it("should render self", () => {
      const { enzymeWrapper } = setup();

      console.log(enzymeWrapper.find('Home'));
      expect(enzymeWrapper.find(Home).find('.home__header').text()).toContain('User Hobbies')
    });
  })
});
