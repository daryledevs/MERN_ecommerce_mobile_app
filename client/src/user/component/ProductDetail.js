import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import placeholder from '../../asset/image/placeholder.png';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducer/Cart';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image source={placeholder} style={styles.productImage} />
      <View style={styles.name_brand_container}>
        <Text style={styles.title}>{product.name}</Text>
        <Text>{product.brand}</Text>
        <Text style={styles.title}>₱{product.price}</Text>
      </View>
      <View>
        <Text style={styles.title}>Description</Text>
        <Text>{product.description}</Text>
      </View>
      <Text>
        {product.rating === null
          ? 'No ratings yet'
          : `Ratings:  ${product.rating}`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={() => dispatch(addToCart(product))}
        />
        <Button title="Buy Now" onPress={() => dispatch(addToCart(product))} />
      </View>
    </View>
  );
}

export default ProductDetail

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    paddingHorizontal: 15,
    paddingBottom: 15
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },

  name_brand_container:{
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },

  productImage:{
    width: "80%",
    height: 200,
    alignSelf: "center"
  },

  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: "auto",

  }
});