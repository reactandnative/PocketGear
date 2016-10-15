/* @flow */

import Exponent, { Font, Components } from 'exponent';
import { MaterialIcons } from '@exponent/vector-icons';
import React, { Component } from 'react';
import Home from './src/components/Home';

type State = {
  bootstrapped: boolean;
}

export default class App extends Component<void, void, State> {

  state: State = {
    bootstrapped: false,
  };

  componentWillMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    await Font.loadAsync({
      /* $FlowFixMe */
      Montserrat: require('./assets/fonts/Montserrat.otf'),
      /* $FlowFixMe */
      MontserratBold: require('./assets/fonts/Montserrat_bold.otf'),
      ...MaterialIcons.font,
    });

    global.requestAnimationFrame(() => {
      this.setState({ bootstrapped: true });
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />;
    }

    return <Home />;
  }
}

Exponent.registerRootComponent(App);
