import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Shipping from '..//user/component/Shipping';
import Payment from '../user/component/Payment';
import Confirm from '../user/component/Confirm';
import { useSelector } from 'react-redux';
import { UserAddress } from '../redux/reducer/User';

const Tab = createMaterialTopTabNavigator();
  
const CartCheckout = () => {
  const user_address = useSelector(UserAddress);
  return (
    <Tab.Navigator
      screenListeners={({navigation, route}) => ({
        tabPress: (event) => {
          // console.log(route) // uncomment this to see the list of route
          if(user_address.length < 0) return event.preventDefault();
        },
      })}>
      <Tab.Screen name="Shipping" swipeEnabled={false} component={Shipping} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default CartCheckout

const styles = StyleSheet.create({})