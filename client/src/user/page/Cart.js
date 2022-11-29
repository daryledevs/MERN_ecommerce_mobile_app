import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearCart, removeFromCart } from '../../redux/reducer/Cart';
import placeholder from '../../asset/image/placeholder.png';
import Header from '../../shared/others/Header';

const Cart = () => {
  const cartData = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  var total = 0;
  cartData.forEach(element => {
    total += element.price * element.quantity;
  });

  return (
    <>
      <Header />
      {cartData.length !== 0 ? (
        <View style={{height: '100%', position: 'relative'}}>
          <SwipeListView
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            rightOpenValue={-80}
            disableRightSwipe={true}
            data={cartData}
            keyExtractor={item => item._id}
            renderItem={(cart, rowMap) => {
              return (
                <View style={styles.cartContainer}>
                  <Image style={{width: 45, height: 45}} source={placeholder} />
                  <Text style={styles.name}>{cart.item.name}</Text>
                  <Text style={styles.price}>
                    {cart.item.quantity ? `${cart.item.quantity}x` : null}
                  </Text>
                  <Text style={styles.price}>
                    ₱{cart.item.quantity * cart.item.price}
                  </Text>
                </View>
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => dispatch(removeFromCart(data.item._id.$oid))}>
                  <Icons name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.operationsContainer}>
            <Text style={styles.totalPrice}>₱{total}</Text>
            <Button title="Clear" onPress={() => dispatch(clearCart())} />
            <Button
              title="Checkout"
              onPress={() => navigation.navigate('Cart Checkout')}
            />
          </View>
        </View>
      ) : (
        <View style={styles.noItemContainer}>
          <View style={styles.noItem}>
            <Text
              style={[
                styles.text,
                {
                  marginTop: 25,
                  fontWeight: 'bold',
                  fontSize: 14,
                },
              ]}>
              It seems no displayed items here...
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                },
              ]}>
              Add items to your cart to get started.
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: 80,
  },
  // ------------
  cartContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  price: {
    marginLeft: 'auto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // -------------
  operationsContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  totalPrice: {
    marginRight: 'auto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // -------------
  noItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItem: {
    width: '70%',
    height: '30%',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  text: {
    height: '30%',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
