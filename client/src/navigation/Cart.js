import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartScreen from '../user/page/Cart';
import CartCheckout from './CartCheckout';

const Stack = createStackNavigator();

const CartNavigator = () => {
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