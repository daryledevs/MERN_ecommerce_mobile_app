import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// component
import Header from './src/shared/Header';
import MainNavigation from './src/navigation/MainNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <Header/>
      <MainNavigation/>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
