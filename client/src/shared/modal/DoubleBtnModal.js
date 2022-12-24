import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';

const DoubleBtnModal = ({
  showModal,
  CloseModal,
  title,
  message,
  Proceed,
  Cancel,
}) => {
  return (
    <Modal
      visible={showModal}
      onRequestClose={CloseModal}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalParent}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                flex: 2,
                textAlignVertical: 'center',
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                flex: 2,
              }}>
              {message}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Pressable
              onPress={Cancel}
              style={[
                styles.operationBtn,
                {backgroundColor: '#ff0000', borderBottomLeftRadius: 10},
              ]}>
              <Text style={styles.btnText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={Proceed}
              style={[
                styles.operationBtn,
                {backgroundColor: '#1DB954', borderBottomRightRadius: 10},
              ]}>
              <Text style={styles.btnText}>Proceed</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DoubleBtnModal;


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalParent: {
    backgroundColor: 'white',
    width: '80%',
    height: '20%',
    borderRadius: 10,
  },

  operationBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});