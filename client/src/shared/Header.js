import React from 'react';
import {StyleSheet, Image, SafeAreaView, View} from 'react-native';
import logo from '../asset/image/logo.png'
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image source={logo} resizeMode="contain" style={{width: 90, height: 90}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Header;
