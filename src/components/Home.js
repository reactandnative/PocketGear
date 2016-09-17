/* @flow */

import { Font, Components } from 'exponent';
import { MaterialIcons } from '@exponent/vector-icons';
import React, { Component } from 'react';
import NavigationRoot from './Navigation/NavigationRoot';
import NavigationScene from './Navigation/NavigationScene';
import NavigationView from './Navigation/NavigationView';
import routeMapper from './Navigation/routeMapper';

const PERSISTANCE_KEY = process.env.NODE_ENV !== 'production' ? 'FLAT_PERSISTENCE_0' : null;

type State = {
  bootstrapped: boolean;
}

export default class Home extends Component<void, void, State> {

  state: State = {
    bootstrapped: false,
  };

  componentWillMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    await Font.loadAsync({
      /* $FlowFixMe */
      Montserrat: require('../../assets/fonts/Montserrat.otf'),
      /* $FlowFixMe */
      MontserratBold: require('../../assets/fonts/Montserrat_bold.otf'),
      ...MaterialIcons.font,
    });

    global.requestAnimationFrame(() => {
      this.setState({ bootstrapped: true });
    });
  };

  _renderScene = (props: any) => {
    return (
      <NavigationScene
        {...props}
        key={props.scene.key}
        routeMapper={routeMapper}
      />
    );
  };

  _renderNavigator = (props: any) => {
    return (
      <NavigationView
        {...props}
        renderScene={this._renderScene}
      />
    );
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />;
    }

    return (
      <NavigationRoot
        initialRoute={{ name: 'home' }}
        persistenceKey={PERSISTANCE_KEY}
        renderNavigator={this._renderNavigator}
      />
    );
  }
}
