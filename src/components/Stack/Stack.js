import React from 'react';

import { Text } from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import TabScreen from '../Tab/Tab';
import * as localStorage from '../../config/local-storage/localStorage';
import SignIn from '../SignIn/SignIn';
// import SignUp from '../components/SignUp/SignUp';
import localization from '../../localization/localization';

import color from '../../config/color/color';
import styles from './Stack.style';

const Stack = createStackNavigator();

const StackScreen = () => {
  const goBack = (navigation) => {
    localStorage.removeMultipleValues(['language', 'token']);
    navigation.navigate('SignIn');
  };

  const getHeaderTitle = (route) => {
    const routes = {
      undefined: localization.ContactsTabTop,
      Contacts: localization.ContactsTabTop,
      Status: localization.StatusTabTop,
      Search: localization.SearchTabTop,
      User: localization.UserTabTop,
    };
    return routes[getFocusedRouteNameFromRoute(route)];
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: color.primary,
          },
          headerTitleStyle: {
            color: color.white,
          },
        }}>
        <Stack.Screen
          options={({ route, navigation }) => ({
            headerLeft: () => null,
            headerStyle: {
              height: 50,
              backgroundColor: color.primary,
            },
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <Text
                onPress={() => goBack(navigation)}
                style={styles.exitButton}>
                Exit
              </Text>
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
