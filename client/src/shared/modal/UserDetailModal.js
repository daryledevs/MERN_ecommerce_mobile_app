import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { UserDetails, edit_profile } from '../../redux/reducer/User';

const UserDetailModal = ({ showModal, CloseModal, currentValue, defaultValue }) => {
  const dispatch = useDispatch();
  const [changeDetails, setChangeDetails] = useState(currentValue);
  const user_details = useSelector(UserDetails);
  const genderOption = ["Male", "Female", "Other"];
  const [changeBirthday, setChangeBirthday] = useState(
    user_details.birthday ? new Date(user_details.birthday) : new Date(),
  );
  
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => null}
      animationType="fade"
      transparent={true}>
      <Pressable style={styles.modalContainer} onPress={CloseModal}>
        {defaultValue === 'name' || defaultValue === 'phone' ? (
          <View style={styles.inputContainer}>
            {defaultValue === 'name' ? (
              <>
                <TextInput
                  placeholder="First Name"
                  value={changeDetails.given_name}
                  onChangeText={(text) =>
                    setChangeDetails({ ...changeDetails, given_name: text })
                  }
                  style={styles.textInput}
                />

                <TextInput
                  placeholder="Last Name"
                  value={changeDetails.last_name}
                  onChangeText={(text) =>
                    setChangeDetails({ ...changeDetails, last_name: text })
                  }
                  style={styles.textInput}
                />
              </>
            ) : null}

            {defaultValue === 'phone' ? (
              <TextInput
                value={changeDetails ? changeDetails : defaultValue}
                onChangeText={text => setChangeDetails(text)}
                style={styles.textInput}
                keyboardType="number-pad"
              />
            ) : null}

            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => {
                dispatch(
                  edit_profile(
                    defaultValue === 'name'
                      ? changeDetails
                      : { phone: changeDetails },
                  ),
                );
                CloseModal();
              }}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.chooseContainer}>
            {defaultValue === 'gender' ? (
              <View style={styles.genderContainer}>
                <Text
                  style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
                  Gender
                </Text>
                <View style={styles.chooseGender}>
                  {genderOption.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.genderBtn}
                      onPress={() => {
                        dispatch({ gender: item });
                        CloseModal();
                      }}>
                      <Text style={styles.fontStyle}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}

            {defaultValue === 'birthday' ? (
              <DatePicker
                androidVariant="nativeAndroid"
                mode="date"
                open={true}
                confirmText="Confirm"
                date={changeBirthday}
                onDateChange={(date) => {
                  const my_date = new Date(date.getTime()).toLocaleDateString();
                  setChangeBirthday(date);
                  dispatch(edit_profile({ birthday: date.getTime() }));
                }}
              />
            ) : null}
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

// didn't delete this for guide in the future
// const date_var = new Date(date);
// const time = date_var.getTime();
// console.log(
// date,
// date_var,
// time,
// new Date(time).toLocaleDateString(),
// );

export default UserDetailModal

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputContainer: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },

  btnContainer: {
    backgroundColor: '#6BCB77',
    borderRadius: 100,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  chooseContainer: {
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10
  },

  genderContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseGender: {
    width: '90%',
    height: '80%',
    justifyContent: 'space-between',
  },
  genderBtn: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  fontStyle: {
    color: 'black',
    fontSize: 15,
  },
});
