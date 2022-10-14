import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../user/page/Product';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Homepage" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;