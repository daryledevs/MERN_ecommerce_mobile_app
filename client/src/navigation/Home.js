import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// components
import ProductScreen from '../user/page/Product';
import ProductDetail from '../user/component/ProductDetail';
import ResetHistory from '../util/ResetHistory';

const Stack = createStackNavigator();

const HomeNavigator = () => {

  ResetHistory("Homepage");

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={ProductScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;