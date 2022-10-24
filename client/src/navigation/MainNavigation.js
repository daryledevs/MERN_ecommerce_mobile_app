import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// packages
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import { Token, Loading, LoginTriggers, NoTokenLoading, tokenIsNull } from '../redux/reducer/User';
import AuthNavigator from './AuthNavigator';
import FirstBootLoading from '../shared/FirstBootLoading';
import { getUserInfoByToken } from '../redux/action/User';
import UserProfile from '../user/page/UserProfile';
import { cartData } from '../redux/reducer/Cart';
import Header from '../shared/Header';
import HomeNavigator from './Home';
import CartNavigator from './Cart';
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const cart = useSelector(cartData);
  const isToken = useSelector(Token);
  const isLoading = useSelector(Loading);
  const loginTriggers = useSelector(LoginTriggers);
  const dispatch = useDispatch();

  
   useEffect(() => {
    if (loginTriggers) {
      console.log('loginTriggers: ', loginTriggers);
      dispatch(NoTokenLoading());
    }

    setTimeout(function () {
      AsyncStorage.getItem('token')
        .then(token => {
          console.log('AsyncStorage (token): ', token);
          console.log('Is token not null? ', token !== null);
          if (token) dispatch(getUserInfoByToken());
          else dispatch(tokenIsNull());
        })
        .catch(error => {
          console.log('UserNavigator, error: ', error);
        });
    }, 3000);
  }, [loginTriggers]);

  if(isLoading) {
    console.log("isLoading: ", isLoading);
    return <FirstBootLoading/>;
  }

  return (
    <>
      {isToken ? (
        <>
          <Header/>
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
        </>
      ) : (
        <AuthNavigator />
      )}
    </>
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