import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

const Payment = ({ changePaymentMethod, setChangePaymentMethod }) => {
  const paymentList = ['Cash on Delivery', 'Card Payment'];
  const paymentCards = ['Visa', 'Master Card', 'Discover'];

  return (
    <View style={styles.paymentContainer}>
      <FlatList
        data={paymentList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setChangePaymentMethod(item);
              }}>
              <View
                style={[
                  styles.paymentMethod,
                  {
                    backgroundColor:
                      changePaymentMethod === item ? 'blue' : 'white',
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: changePaymentMethod === item ? 'white' : 'black',
                      flex: 1,
                    },
                  ]}>
                  {item}
                </Text>
                {/* PRESERVED  */}
                {/* {index === 2 ? (
                  <TouchableOpacity
                    style={styles.cardPayment}
                    onPress={() => {
                      setPaymentMethod(paymentList[index]);
                      setMasterCardTrigger(!masterCardTrigger);
                    }}>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[styles.text, {flex: 1, textAlign: 'center'}]}>
                        {cardPayment}
                      </Text>
                      <Icons
                        name="down"
                        size={18}
                        style={{marginLeft: 'auto'}}
                      />
                    </View>
                    {masterCardTrigger && (
                      <FlatList
                        data={paymentCards}
                        renderItem={({item, index}) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setMasterCardTrigger(false);
                                setCardPayment(item);
                              }}>
                              <Text style={{fontSize: 17}}>- {item}</Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ) : null} */}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  paymentContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  paymentMethod: {
    alignContent: 'center',
    marginBottom: 1,
    padding: 10,
    flexDirection: 'row',
  },
  cardPayment: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    width: 120,
    marginLeft: 'auto',
    paddingLeft: 2,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
