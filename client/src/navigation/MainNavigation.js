import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, BackHandler, Alert } from 'react-native';
// packages
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon_2 from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import {
  dispatchLoading,
  error_cleanup,
  GoodByeLoadingState,
  IsToken,
  Loading,
  LoginError,
  tokenIsNull,
} from '../redux/reducer/User';
import FirstBootLoading from '../shared/loading/FirstBootLoading';
import { getUserInfoByToken } from '../redux/action/User';
import UserProfile from '../user/page/UserProfile';
import { cartData, cart_fetchFailed, FetchCartStatus } from '../redux/reducer/Cart';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './Home';
import CartNavigator from './Cart';
import GoodByeLoading from '../shared/loading/GoodByeLoading';
import Wishlist from '../user/page/Wishlist';
import {
  product_fetchFailed,
  FetchProductStatus,
} from '../redux/reducer/Product';
import ErrorModal from '../shared/modal/ErrorModal';
import { FetchWishlistStatus, wishlist_fetchFailed } from '../redux/reducer/Wishlist';
import { ShowRoute } from '../redux/reducer/RouteNavigation';
import { FetchOrderStatus, order_fetchFailed } from '../redux/reducer/Order';
import ProfileNavigator from './ProfileNavigator';
import { get_current_page } from '../redux/reducer/RouteNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();

  // trigger modals
  const [triggerNoToken, setTriggerNoToken] = useState(false);
  const [triggerUserNotFound, setTriggerUserNotFound] = useState(false);

  // redux states
  const cart = useSelector(cartData);
  const isToken = useSelector(IsToken);
  const isLoading = useSelector(Loading);
  const loginError = useSelector(LoginError);
  const show_route = useSelector(ShowRoute);
  const goodByeLoading = useSelector(GoodByeLoadingState);
  const fetchProductStatus = useSelector(FetchProductStatus);
  const fetchWishlistStatus = useSelector(FetchWishlistStatus);
  const fetchCartStatus = useSelector(FetchCartStatus);
  const fetchOrderStatus = useSelector(FetchOrderStatus);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     Alert.alert(
  //       'Exit App',
  //       'Do you want to exit?',
  //       [
  //         {
  //           text: 'No',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: () => {
  //             BackHandler.exitApp();
  //           },
  //         },
  //       ],
  //       {cancelable: false},
  //     );
  //     return true;
  //   });
  //   return () => {
  //     BackHandler.removeEventListener();
  //   };
  // }, []);


  function fetchFailed(){
    dispatch(product_fetchFailed());
    dispatch(wishlist_fetchFailed());
    dispatch(cart_fetchFailed());
    dispatch(order_fetchFailed());
  }

  useEffect(() => {
    switch (loginError) {
      case 'Token is expired':
        setTriggerNoToken(true);
        fetchFailed();
        break;

      case 'User not found':
        setTriggerUserNotFound(true);
        break;
    }
    dispatch(error_cleanup());
  }, [loginError]);
  
   useEffect(() => {
     dispatch(dispatchLoading());
     AsyncStorage.getItem('token')
       .then(token => {
          console.log('AsyncStorage (token): ', token);
          if (token) return dispatch(getUserInfoByToken(token));
          else {
            fetchFailed();
            dispatch(tokenIsNull())
            setTimeout(() => dispatch(tokenIsNull()), 3000);
          }
        })
       .catch(error => {
         console.log(error);
       });
   }, [goodByeLoading]);

  if (
    !fetchProductStatus.doneGetProduct ||
    !fetchProductStatus.doneGetCategory ||
    !fetchWishlistStatus || !fetchCartStatus ||
    !fetchOrderStatus || isLoading 
  ) return <FirstBootLoading />;

  if(goodByeLoading) return <GoodByeLoading isVisible={goodByeLoading} />;

  return (
    <>
      {/* MODALS */}

      <ErrorModal
        modalTrigger={triggerNoToken}
        errorTitle="Token Expired"
        errorDescription="Your session has expired. Please login again to refresh your token
            session. Thank you!"
        dismissOnPress={async () => {
          setTriggerNoToken(false);
          await AsyncStorage.removeItem('token');
        }}
      />

      <ErrorModal
        modalTrigger={triggerUserNotFound}
        errorTitle="User not found"
        errorDescription="Please make sure you entered the right email."
        dismissOnPress={async () => setTriggerUserNotFound(false)}
      />

      {isToken ? (
        <>
          <Tab.Navigator
            initialRouteName="Home"
            screenListeners={({navigation, route}) => {
              // it would be better to console log the route to understand how it works
              // I didn't used the GetCurrentPage from util due to hooks error 

              // if not undefined, then off the bottom tabs
              if(route?.state?.routes[1]?.name) dispatch(get_current_page(true));
              // if the value is undefined, then put back
              else dispatch(get_current_page(false)); 
            }}
            screenOptions={{
              showLabel: false,
              activeTinColor: '#e91e63',
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 13,
              },
              tabBarStyle: {display: show_route ? 'none' : 'flex'},
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
              name="Wishlist"
              component={Wishlist}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon_2
                    name="heart"
                    style={{position: 'relative'}}
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Me"
              component={ProfileNavigator}
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
        <>
          <AuthNavigator />
        </>
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