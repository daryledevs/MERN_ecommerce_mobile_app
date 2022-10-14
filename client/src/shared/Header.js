import React from 'react';
import {StyleSheet, Image, SafeAreaView, View} from 'react-native';
import logo from '../asset/image/logo.png'
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image source={logo} resizeMode="contain" style={{width: 100, height: 100}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default Header;
