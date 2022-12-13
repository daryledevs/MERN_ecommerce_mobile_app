import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../others/CustomInput';
import Icon from "react-native-vector-icons/AntDesign";
import api from '../../asset/api';
import { useDispatch, useSelector } from 'react-redux';
import { UserDetails, addNewAddress } from '../../redux/reducer/User';
import { useState } from 'react';
import LoadingScreen from '../loading/LoadingScreen';

const AddressFillUpModal = ({showModal, closeModal}) => {

  const user_details = useSelector(UserDetails);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signUpValidationSchema = yup.object().shape({
    house_number: yup.number().required('House number is required'),
    zip_code: yup.number().required('ZIP is required'),
    street: yup.string().required('Street is required'),
    subdivision: yup.string().required('Subdivision is required'),
    barangay: yup.string().required('Barangay is required'),
    city: yup.string().required('City is required'),
    province: yup.string().required('Province is required'),
  });

  function SubmitHandler(values) {
    setIsLoading(true);
    api
      .post(`/user-address/${user_details._id}`, {
        ...values,
      })
      .then(res => {
        dispatch(addNewAddress(res.data.user_address));
        closeModal();
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => closeModal()}>
      <View style={styles.modalContainer}>
        <LoadingScreen isVisible={isLoading} />
        <View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            <View style={styles.fillUpFormContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18, margin: 5}}>
                  Present Address
                </Text>
                <Icon
                  name="close"
                  size={25}
                  style={{marginLeft: 'auto'}}
                  onPress={closeModal}
                />
              </View>
              <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{
                  house_number: '',
                  street: '',
                  subdivision: '',
                  city: '',
                  barangay: '',
                  province: '',
                }}
                onSubmit={values => SubmitHandler(values)}>
                {({handleSubmit, isValid}) => (
                  <>
                    <Field
                      component={CustomInput}
                      name="house_number"
                      placeholder="House Number"
                      keyboardType="numeric"
                    />

                    <Field
                      component={CustomInput}
                      name="street"
                      placeholder="Street"
                    />

                    <Field
                      component={CustomInput}
                      name="subdivision"
                      placeholder="Subdivision"
                    />

                    <Field
                      component={CustomInput}
                      name="city"
                      placeholder="City"
                    />

                    <Field
                      component={CustomInput}
                      name="barangay"
                      placeholder="Barangay"
                      keyboardType="numeric"
                    />

                    <Field
                      component={CustomInput}
                      name="province"
                      placeholder="Province"
                    />

                    <Field
                      component={CustomInput}
                      name="zip_code"
                      placeholder="ZIP"
                      keyboardType="numeric"
                    />

                    <Pressable
                      onPress={handleSubmit}
                      disabled={!isValid}
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 5,
                        width: '40%',
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        borderRadius: 100,
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        ADD
                      </Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddressFillUpModal

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
  },

  fillUpFormContainer: {
    backgroundColor: 'white',
    width: 300,
    padding: 15,
    borderColor: 'red',
    borderRadius: 15
  },
});