import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './Home';
import CartNavigator from './Cart';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
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
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={HomeNavigator}
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
