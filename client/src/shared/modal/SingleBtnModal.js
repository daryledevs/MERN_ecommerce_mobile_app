import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

const SingleBtnModal = ({ showModal, CloseModal, errorTitle, errorMsg }) => {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={CloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalParent}>
          <View style={styles.titleAndDescription}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                flex: 2,
                textAlignVertical: 'center',
              }}>
              {errorTitle}
            </Text>
            <Text
              style={{
                fontSize: 16,
                flex: 2,
              }}>
              {errorMsg}
            </Text>
          </View>
          <Pressable style={styles.btn} onPress={CloseModal}>
            <Text style={styles.btnText}>Okay</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default SingleBtnModal

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
    height: '25%',
    borderRadius: 10,
  },

  titleAndDescription: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1DB954',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  btnText: {
    fontWeight: 'bold',
    color: 'white',
  },
});