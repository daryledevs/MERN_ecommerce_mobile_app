import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../user/page/Product';
import ProductDetail from '../user/component/ProductDetail';
const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Homepage" component={ProductScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;