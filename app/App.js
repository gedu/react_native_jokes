import React, {Component} from 'react';
import { Provider } from 'react-redux';

import store from './JokeStore';
import JokeWidget from './JokeWidget';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <JokeWidget />
      </Provider> 
    );
  }
}