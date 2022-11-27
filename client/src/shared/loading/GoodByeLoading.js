import React, { useEffect, useState } from 'react';
import sad from '../../asset/image/sad.png';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';

const GoodByeLoading = ({ isVisible }) => {

  return (
    <Modal visible={isVisible}>
      <View style={styles.container}>
        <Image source={sad} style={styles.image} />
        <Text style={styles.goodbyeText}>Goodbye</Text>
      </View>
    </Modal>
  );
};

export default GoodByeLoading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },

  image: {
    width: 140,
    height: 140,
  },

  goodbyeText:{
    fontWeight: 'bold',
    fontSize: 20
  }
});
