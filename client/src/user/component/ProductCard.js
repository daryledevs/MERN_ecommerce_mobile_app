import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import placeholder from '../../asset/image/placeholder.png';

const ProductCard = ({ product }) => {

  return (
    <TouchableOpacity style={styles.productContainer}>
      <View style={styles.productDetails}>
        <Image source={placeholder} style={styles.productImage} />
        <Text style={styles.name}>{product.name}</Text>
      </View>
      <Text style={styles.price}>₱{product.price}</Text>
    </TouchableOpacity>
  );
}

export default ProductCard

// color pallette
// #3b1448 
// #ff603e 
// #02d6c2
// #866f8f

const styles = StyleSheet.create({
  productContainer: {
    // flex: 1,
    borderWidth: 1,
    width: '50%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  productDetails: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    marginTop: 'auto',
    color: '#3b1448',
    margin: 5
  },
});