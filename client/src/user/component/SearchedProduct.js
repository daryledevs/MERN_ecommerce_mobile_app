import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import placeholder from '../../asset/image/placeholder.png'
const SearchedProducts = props => {
  const { item } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Product Detail', {product: item.product})}>
      <Image
        style={styles.image}
        source={placeholder}
      />
      <View>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.name}>{item.product.brand}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 5,
  },

  name: {
    fontSize: 17,
    paddingLeft: 5,
  },

  image: {
    width: 40,
    height: 40,
  },
});

export default SearchedProducts;
