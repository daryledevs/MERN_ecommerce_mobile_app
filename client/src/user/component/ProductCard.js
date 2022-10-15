import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import placeholder from '../../asset/image/placeholder.png';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate("Product Detail", {product})}>
      <View style={styles.productDetails}>
        <Image source={placeholder} style={styles.productImage} />
        <Text style={styles.name}>{product.name}</Text>
      </View>
      <Text style={styles.price}>₱{product.price}</Text>
    </TouchableOpacity>
  );
}

export default ProductCard

const styles = StyleSheet.create({
  productContainer: {
    width: '50%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    marginVertical: 5
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