import React from 'react';
import {Provider} from 'react-redux';
import store from './source/Store';
import Calculator from './source/container/Calulator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Calculator />
      </Provider>
    );
  }
}
