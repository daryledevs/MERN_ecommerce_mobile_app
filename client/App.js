import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// component
import MainNavigation from './src/navigation/MainNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
