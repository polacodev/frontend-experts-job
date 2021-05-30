import React, { useState } from 'react';

import { Text } from 'native-base';
import OneSignal from 'react-native-onesignal';

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import TabScreen from '../Tab/Tab';
import * as localStorage from '../../config/local-storage/localStorage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import localization from '../../localization/localization';

import color from '../../config/color/color';
import styles from './Stack.style';

const Stack = createStackNavigator();

const StackScreen = () => {
  const [isExternalUserIdPushed, setIsExternalUserIdPushed] = useState(false);

  const goBack = (navigation) => {
    localStorage.removeMultipleValues(['language', 'token']);
    OneSignal.removeExternalUserId((results) => {
      // The results will contain push and email success statuses
      // console.log('Results of removing external user id');
      // console.log(results);
      // // Push can be expected in almost every situation with a success status, but
      // // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
        //   console.log('Results of removing external user id push status:');
        //   console.log(results.push.success);
        setIsExternalUserIdPushed(results.push.success);
      }
      // // Verify the email is set or check that the results have an email success status
      // if (results.email && results.email.success) {
      //   console.log('Results of removoing external user id email status:');
      //   console.log(results.email.success);
      // }
    });
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
                {localization.routesExit}
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
            headerTitle: 'Sign Up',
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackScreen;
