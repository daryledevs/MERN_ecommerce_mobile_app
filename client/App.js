import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <Text>Hello World</Text>
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
