import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Status from '../components/Status/Status';
// import Search from '../components/Search/Search';
// import UserInformation from '../components/UserProfile/UserInformation';
// import Contacts from '../components/Contacts/Contacts';
import IconEJ from '../../core-components/IconEJ/IconEJ';
import TextEJ from '../../core-components/TextEJ/TextEJ';

import color from '../../config/color/color';

const Tab = createBottomTabNavigator();

const Status = () => {
  return <TextEJ type="normal">userNam se es</TextEJ>;
};

const TabScreen = ({ }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const icons = {
          Contacts: 'address-book',
          Status: 'dot-circle-o',
          Search: 'user-plus',
          User: 'user',
        };
        const colorIcon = focused ? color.white : color.gray;
        return (
          <IconEJ iconName={icons[route.name]} size={20} color={colorIcon} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: color.white,
      inactiveTintColor: color.gray,
      style: {
        paddingTop: 4,
        backgroundColor: color.primary,
        paddingBottom: 4,
      },
    }}>
    <Tab.Screen name="Contacts" component={Status} />
    <Tab.Screen name="Status" component={Status} />
    <Tab.Screen name="Search" component={Status} />
    <Tab.Screen name="User" component={Status} />
  </Tab.Navigator>
);

export default TabScreen;
