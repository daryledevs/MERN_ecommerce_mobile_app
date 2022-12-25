import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// components
import UserProfile from '../user/page/UserProfile';
import Shipping from '../user/component/Shipping';
import Orders from '../user/page/Orders';
import UserDetail from '../user/component/UserDetail';
import ResetHistory from '../util/ResetHistory';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  ResetHistory('UserProfile');

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          title: 'Edit Profile',
        }}
        name="UserProfile"
        component={UserProfile}
      />

      <Stack.Screen
        name="UserDetail"
        options={{
          headerShown: true,
          title: 'Edit Profile',
        }}
        component={UserDetail}
      />

      <Stack.Screen
        name="Shipping"
        options={{
          headerShown: true,
          title: 'Shopping Address',
        }}
        component={Shipping}
      />

      <Stack.Screen
        name="Order"
        options={{
          headerShown: true,
          title: 'My Purchases',
        }}
        component={Orders}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
