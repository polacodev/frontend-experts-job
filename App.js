/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Container } from 'native-base';
import { ApolloProvider } from '@apollo/client';
import OneSignal from 'react-native-onesignal';

import client from './src/service/setup';
import Stack from './src/components/Stack/Stack';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubscribed: false,
    };
  }
  componentDidMount = async () => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('a8e14de4-6294-4730-a467-c5807e33d664');
    // OneSignal.setLogLevel(6, 0);
    const deviceState = await OneSignal.getDeviceState();
    this.setNewNotification(deviceState);
  };

  setNewNotification = (deviceState) => {
    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  };

  componentWillUnmount = () => {
    OneSignal.clearHandlers();
  };

  render() {
    return (
      <Container>
        <ApolloProvider client={client}>
          <Stack />
        </ApolloProvider>
      </Container>
    );
  }
}

export default App;
