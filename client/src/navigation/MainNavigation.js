import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// packages
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
// components
import HomeNavigator from './Home';
import CartNavigator from './Cart';
import UserProfile from '../user/page/UserProfile';
import { cartData } from '../redux/reducer/Cart';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const cart = useSelector(cartData);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        KeyboardHidesTabBar: true,
        showLabel: false,
        activeTinColor: '#e91e63',
        headerShown: false,
        tabBarStyle: {height: 60},
        tabBarLabelStyle: {
          fontSize: 13,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="home"
              style={{position: 'relative'}}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon
                name="shopping-cart"
                style={{position: 'relative'}}
                color={color}
                size={24}
              />
              {cart.length !== 0 ? (
                <Text style={styles.countCartItems}>{cart.length}</Text>
              ) : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={UserProfile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="user-alt"
              style={{position: 'relative'}}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  countCartItems: {
    position: 'absolute',
    zIndex: 1,
    left: 15,
    top: -4,
    width: 19,
    textAlign: 'center',
    borderRadius: 100,
    color: 'white',
    backgroundColor: 'red',
  },
});