/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';
import { ApolloProvider } from '@apollo/client';

import client from './src/service/setup';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <View>
        <Text>Step One</Text>
      </View>
    </ApolloProvider>
  );
};

export default App;
