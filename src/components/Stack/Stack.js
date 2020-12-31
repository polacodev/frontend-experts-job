import * as React from 'react';
import { Button, Text } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import TabScreen from '../Tab/Tab';
import TextEJ from '../../core-components/TextEJ/TextEJ';

import SignIn from '../SignIn/SignIn';
// import SignUp from '../components/SignUp/SignUp';

const Stack = createStackNavigator();

const StackScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.navigate('Sign In');
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3F51B5',
          },
          headerTitleStyle: {
            color: '#ffffff',
          },
        }}>
        <Stack.Screen
          options={({ route }) => ({
            headerLeft: () => null,
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerRight: () => (
              <Button onPress={goBack}>
                <Text>Exit</Text>
              </Button>
            ),
          })}
          name="Contacts"
          component={TabScreen}
        />
        <Stack.Screen
          options={{
            header: () => null,
            headerTitle: 'Sign In',
          }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            header: () => null,
            headerTitle: 'Sign In',
          }}
          name="SignUp"
          component={SignIn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackScreen;
