import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import GetCurrentPage from '../../util/GetCurrentPage';
import { useSelector } from 'react-redux';
import { OrderItems } from '../../redux/reducer/Order';
import placeholder from "../../asset/image/placeholder.png";

import Icon from 'react-native-vector-icons/FontAwesome5';

const Orders = () => {
  GetCurrentPage({ on: true, off: false });
  const order_items = useSelector(OrderItems);
  return (
    <ScrollView>
      {order_items.map((item) => {
        return (
          <View key={item._id}>
            {item.order_item_id.map(order => {
              return (
                <View style={styles.order_card} key={order._id}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="store" size={23} />
                    <Text
                      style={{fontSize: 17, fontWeight: 'bold', marginLeft: 5}}>
                      {order.product.product_seller
                        ? order.product.product_seller
                        : 'Unknown'}
                    </Text>
                  </View>
                  <View style={styles.order_details}>
                    <View style={{ borderWidth: 1, borderColor: "#ccc" }}>
                      <Image
                        source={order.image ? {uri: order.image} : placeholder}
                        style={{height: 70, width: 70}}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 'auto',
                        alignItems: 'flex-end',
                        marginTop: 10
                      }}>
                      <Text>{order.product.name}</Text>
                      <Text>₱{order.product.price}</Text>
                      <Text>{order.quantity}</Text>
                      <Text>
                        Total: ₱{order.product.price * order.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  )
}

export default Orders

const styles = StyleSheet.create({
  order_card: {
    padding: 10, 
    marginBottom: 5, 
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc"
  },
  order_details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});