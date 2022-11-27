import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

const LoadingScreen = ({isVisible}) => {

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
});
