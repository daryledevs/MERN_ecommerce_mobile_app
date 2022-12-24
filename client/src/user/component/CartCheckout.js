import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import {
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddress, UserDetails } from '../../redux/reducer/User';
import api from '../../asset/api';
import {StripeProvider, useStripe, presentPaymentSheet, initPaymentSheet} from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import getPublishableKey from '../../util/PublishableKey';
import { create_orders } from '../../redux/action/Order';
import { FlatList } from 'react-native-gesture-handler';
import placeholder from '../../asset/image/placeholder.png';
import Icon from 'react-native-vector-icons/AntDesign';

const CartCheckout = () => {
  let total = 0;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.item_cart);
  const user_details = useSelector(UserDetails);
  const user_address = useSelector(UserAddress);
  const [defaultAddress, setDefaultAddress] = useState(user_details.address_id);
  const [fetchPublishableKey, setFetchPublishableKey] = useState(null);
  const [fetchPubKeyDone, setFetchPubKeyDone] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log('CART DATA: ', cartData);
  cartData.forEach(element => {
    total += element.product_id.price * element.quantity;
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
          name: `${user_details.give_name}${user_details.last_name}`,
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
              name: `${user_details.give_name}${user_details.last_name}`,
            },
          });

          if (!error) setLoading(true);
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
      
      Alert.alert('Success', 'Your order is confirmed!', [
        {text: 'OK', onPress: () => {
          navigation.dispatch(state => {
            return CommonActions.reset({
              index: 0,
              routes: [{name: 'Cart Screen'}],
            });
          });
        }},
      ]);
    }
  };

  async function ChangeAddress(address){
    api
      .put(`/users/edit-profile/${user_details._id}`, {
        address_id: address,
      })
      .then(() => {
        setDefaultAddress(address);
        console.log('Changed default address');
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  if (!fetchPubKeyDone) return <></>;
  return (
    <StripeProvider publishableKey={`${fetchPublishableKey}`}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Shipping to:
          </Text>
          <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            style={{
              padding: 5,
              marginVertical: 5,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={user_address}
            keyExtractor={item => `${item._id}_${Date.now()}`}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => ChangeAddress(item._id)}
                  style={{
                    height: 120,
                    width: 360,
                    justifyContent: 'center',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    elevation: 10,
                    zIndex: 5,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        {user_details.given_name} {user_details.last_name}{' '}
                      </Text>
                      <Text>| {user_details.phone}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text>
                        {item.house_number} {item.street} St., Barangay{' '}
                        {item.barangay}, {item.subdivision}, {item.city},{' '}
                        {item.province}, {item.zip_code}
                      </Text>
                    </View>
                  </View>
                  {defaultAddress === item?._id ? (
                    <View
                      style={{
                        marginTop: 'auto',
                        marginLeft: 'auto',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{marginRight: 5, fontSize: 14}}>
                        Delivery Address
                      </Text>
                      <Icon
                        name="checkcircleo"
                        size={19}
                        color="white"
                        style={{backgroundColor: 'blue', borderRadius: 100}}
                      />
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product Detail', {
                    product: item.product_id,
                  });
                }}
                key={`${item._id}__${Date.now()}`}
                style={styles.order_cards}>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                  }}
                  source={
                    item.product_id.image
                      ? {uri: item.product_id.image}
                      : placeholder
                  }
                />
                <View>
                  <Text>{item.product_id.name}</Text>
                  <Text>₱{item.product_id.price * item.quantity}</Text>
                  <Text>QTY: {item.quantity}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#ccc',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexGrow: 1,
            flexShrink: 0,
          }}>
          <Text
            style={{
              color: 'black',
              marginRight: 5,
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            Subtotal:
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
            }}>
            ₱{total}
          </Text>
        </View>
        <TouchableOpacity
          disabled={!loading}
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
      </View>
    </StripeProvider>
  );
};

export default CartCheckout;

const styles = StyleSheet.create({
  order_cards:{
    borderColor: "#ccc",
    flexDirection: 'row',
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 5,
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginBottom: 10
  }
});