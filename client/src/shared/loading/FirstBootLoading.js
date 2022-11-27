import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import logo from '../../asset/image/logo.png';
const FirstBootLoading = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  )
}

export default FirstBootLoading

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },

  image: {
    width: 200,
    height: 200,
  },
});