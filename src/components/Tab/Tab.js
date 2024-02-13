import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Contacts from '../Contacts/Contacts';
import Status from '../Status/Status';
import Search from '../Search/Search';
import UserInformation from '../UserInformation/UserInformation';
import IconEJ from '../../core-components/IconEJ/IconEJ';
import CustomTextEJ from '../../core-components/CustomTextEJ/CustomTextEJ';
import localization from '../../localization/localization';

import color from '../../config/color/color';
import styles from './Tab.style';

const Tab = createBottomTabNavigator();

const TabCustomBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icons = {
          Contacts: 'address-book',
          Status: 'dot-circle-o',
          Search: 'search-plus',
          User: 'user',
        };

        const routes = {
          Contacts: localization.ContactsTabFoot,
          Status: localization.StatusTabFoot,
          Search: localization.SearchTabFoot,
          User: localization.UserTabFoot,
        };

        const colorIcon = isFocused ? color.white : color.gray;
        const colorText = isFocused ? color.white : color.gray;

        return (
          <TouchableOpacity
            key={routes[route.name]}
            onPress={onPress}
            activeOpacity={1}
            style={styles.tabBarContainer}>
            <IconEJ iconName={icons[route.name]} size={20} color={colorIcon} />
            <CustomTextEJ type="normal" size={10} color={colorText}>
              {routes[route.name]}
            </CustomTextEJ>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabScreen = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

  return (
    <Tab.Navigator tabBar={(props) => <TabCustomBar {...props} />}>
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={() => ({
          tabBarVisible: keyboardStatus !== 'Keyboard Shown' ? true : false,
        })}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={() => ({
          tabBarVisible: keyboardStatus !== 'Keyboard Shown' ? true : false,
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={() => ({
          tabBarVisible: keyboardStatus !== 'Keyboard Shown' ? true : false,
        })}
      />
      <Tab.Screen
        name="User"
        options={() => ({
          tabBarVisible: keyboardStatus !== 'Keyboard Shown' ? true : false,
        })}
        component={UserInformation}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
