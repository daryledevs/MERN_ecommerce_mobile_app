import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Shipping from './Shipping';
import Payment from './Payment';
import Confirm from './Confirm';

const Tab = createMaterialTopTabNavigator();

const CartCheckout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={Shipping} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default CartCheckout

const styles = StyleSheet.create({})