import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const SingleButton = ({ modalTrigger, errorTitle, errorDescription, dismissOnPress }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalTrigger}
      onRequestClose={() => null}>
      <View style={styles.modal_container}>
        <View style={styles.modal_parent}>
          <View style={styles.titleContainer}>
            <Icon
              name="error-outline"
              size={27}
              color="white"
              style={{marginHorizontal: 3}}
            />
            <Text style={styles.title_text}>{errorTitle}</Text>
          </View>
          <View style={{flex: 3, justifyContent: 'space-evenly', padding: 4}}>
            <Text style={{color: 'black', fontSize: 14}}>
              {errorDescription}
            </Text>
            <TouchableOpacity
              style={styles.dismissBtn}
              onPress={dismissOnPress}>
              <Text style={styles.dismissBtnText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SingleButton

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal_parent: {
    width: '70%',
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  titleContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  title_text: {
    fontSize: 18,
    color: 'white',
  },

  dismissBtn:{
    alignSelf: "center",
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 7
  },

  dismissBtnText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});