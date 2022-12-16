import {StyleSheet, Text, View, Modal, Pressable, Image, ScrollView} from 'react-native';
import React from 'react';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInputV2 from '../others/CustomInputV2';
import Icon from 'react-native-vector-icons/FontAwesome';
import visa from "../../asset/image/visa.png";
import mastercard from '../../asset/image/mastercard.png';
import discover from '../../asset/image/discover.png';

const PaymentModal = ({showModal, closeModal}) => {
  
  const cardPaymentSchema = yup.object().shape({
    name_on_card: yup.string().required('Your name is required'),
    card_number: yup
      .number()
      .test(
        'Is card number exact 16 digits?',
        'Please place 16 digits of your card number',
        value => {
          if(value?.toString().length < 16) return false;
          return true;
        },
      )
      .required('Card number is required'),
    expiry_date: yup
      .string()
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        'Not a valid expiration date. Example: MM/YY',
      )
      .max(5, 'Not a valid expiration date. Example: MM/YY')
      .test('Is card date expired?', 'Your card is already expired.', value => {
        const current_month = new Date().getMonth() + 1;
        const current_year = `${new Date().getFullYear()}`.slice(2, 4);
        const date = `${current_month}/${current_year}`;
        if (value === date) return false;
        return true;
      })
      .required('Expiration date is required')
      .typeError('Not a valid expiration date. Example: MM/YY'),
    cvv: yup.number().required('CVV is required'),
  });

  function getCardType(number) {
    const card_regex = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard:
        /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    for (var key in card_regex) {
      // remove all whitespace
      if (card_regex[key].test(number.replace(/ /g, ''))) {
        return key;
      }
    }

    return 'unknown';
  };

  function SubmitHandler(values){
    // API HERE
    console.log(values);
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType={'slide'}
      onRequestClose={() => closeModal()}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            paddingTop: 20,
            width: '100%',
            height: 390,
            backgroundColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 15,
          }}>
          <Icon
            name="window-close"
            size={25}
            style={{marginBottom: 15}}
            onPress={closeModal}
          />
          <Formik
            validationSchema={cardPaymentSchema}
            initialValues={{
              name_on_card: '',
              card_number: '',
              expiry_date: '',
              cvv: '',
            }}
            onSubmit={values => SubmitHandler(values)}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Text style={{color: 'black'}}>Name on card</Text>
                <Field
                  component={CustomInputV2}
                  name="name_on_card"
                  placeholder="Name"
                  maxLength={20}
                  customStyle={{marginTop: 5}}
                />
                <Text style={{color: 'black', marginTop: 5}}>
                  Card Information
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Field
                    component={CustomInputV2}
                    name="card_number"
                    placeholder="Card Number"
                    keyboardType="numeric"
                    maxLength={20}
                    isCardNumber={true}
                    customStyle={{marginTop: 5, flex: 3}}
                  />
                  <View
                    style={{
                      flex: 1.5,
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        height: 40,
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                      }}>
                      {getCardType(`${values.card_number}`) === 'visa' ? (
                        <Image
                          source={visa}
                          style={{
                            height: 34,
                            width: 34,
                            margin: 5,
                          }}
                        />
                      ) : (
                        <Icon name="cc-visa" size={25} />
                      )}

                      {getCardType(`${values.card_number}`) === 'mastercard' ? (
                        <Image
                          source={mastercard}
                          style={{
                            height: 34,
                            width: 34,
                            margin: 5,
                          }}
                        />
                      ) : (
                        <Icon
                          name="cc-mastercard"
                          size={25}
                          style={{marginHorizontal: 5}}
                        />
                      )}

                      {getCardType(`${values.card_number}`) === 'discover' ? (
                        <Image
                          source={discover}
                          style={{
                            height: 34,
                            width: 34,
                            margin: 5,
                          }}
                        />
                      ) : (
                        <Icon name="cc-discover" size={25} />
                      )}
                    </View>
                    <Text style={{fontSize: 10}}></Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Field
                    component={CustomInputV2}
                    name="expiry_date"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    customStyle={{flex: 1, marginRight: 5}}
                    cardDate={true}
                  />
                  <Field
                    component={CustomInputV2}
                    name="cvv"
                    placeholder="CVV"
                    keyboardType="numeric"
                    maxLength={3}
                    customStyle={{flex: 1}}
                  />
                </View>

                <Pressable
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={{
                    padding: 5,
                    width: '40%',
                    backgroundColor: '#005ea6',
                    alignSelf: 'center',
                    borderRadius: 100,
                    marginVertical: 10,
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                    SAVE
                  </Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({});
