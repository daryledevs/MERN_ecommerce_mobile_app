import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddress, UserDetails } from '../../redux/reducer/User';
import api from '../../asset/api';
import {StripeProvider, useStripe, presentPaymentSheet, initPaymentSheet} from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import getPublishableKey from '../../util/PublishableKey';
import { create_orders } from '../../redux/action/Order';

const CartCheckout = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.item_cart);
  const user_details = useSelector(UserDetails);
  const user_address = useSelector(UserAddress);
  const [fetchPublishableKey, setFetchPublishableKey] = useState(null);
  const [fetchPubKeyDone, setFetchPubKeyDone] = useState(true);
  const [loading, setLoading] = useState(false);

  var total = 0;
  cartData.forEach(element => {
    total += element.price * element.quantity;
  });

  useEffect(() => {
    async function initialized() {
      const publishableKey = await getPublishableKey();
      if (!publishableKey)
        return Alert.alert('Error', 'Publishable key is undefined');
      setFetchPublishableKey(publishableKey);
      setFetchPubKeyDone(true);
    }

    const initializePaymentSheet = async () => {
      api
        .post('/stripe/checkout', {
          name: `${user_details.give_name}${user_details.last_name_}`,
          paymentMethodType: 'card',
          currency: 'PHP',
          subtotal: total,
        })
        .then(async res => {
          const {ephemeralKey, customer, paymentIntent} = res.data;

          const {error} = await initPaymentSheet({
            merchantDisplayName: 'New Market',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
              name: `${user_details.give_name}${user_details.last_name_}`,
            },
          });

          if (error) setLoading(true);
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    };

    initialized();
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      dispatch(create_orders());
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  if (!fetchPubKeyDone) return <></>;
  return (
    <StripeProvider publishableKey={`${fetchPublishableKey}`}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              padding: 5,
            }}>
            Items:
          </Text>
          {cartData.map(item => {
            return (
              <View key={item.cart_id} style={styles.order_cards}>
                <Text>{item.name}</Text>
                <Text>₱{item.price * item.quantity}</Text>
                <Text>{item.quantity}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            flex: 3,
            justifyContent: 'space-evenly',
            padding: 5,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              Shipping to:
            </Text>
            <Text
              style={{
                color: 'black',
              }}>
              {user_address[0]?.house_number} {user_address[0]?.street} St.,
              Barangay {user_address[0]?.barangay},{' '}
              {user_address[0]?.subdivision}, {user_address[0]?.city},{' '}
              {user_address[0]?.province}, {user_address[0]?.zip_code}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              Order Info:
            </Text>
            <Text
              style={{
                color: 'black',
              }}>
              Subtotal: {total}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={openPaymentSheet}
          style={{
            alignSelf: 'center',
            width: 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            borderRadius: 40,
            backgroundColor: '#1c33ca',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </StripeProvider>
  );
};

export default CartCheckout;

const styles = StyleSheet.create({
  order_cards:{
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 20
  }
});