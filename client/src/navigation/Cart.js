import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
// components
import CartScreen from '../user/page/Cart';
import CartCheckout from './CartCheckout';
import ResetHistory from '../util/ResetHistory';

const Stack = createStackNavigator();

const CartNavigator = () => {
  
  ResetHistory('Cart Screen');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Cart Screen" component={CartScreen} />
      <Stack.Screen name="Cart Checkout" component={CartCheckout} />
    </Stack.Navigator>
  );
}

export default CartNavigator;

const styles = StyleSheet.create({})