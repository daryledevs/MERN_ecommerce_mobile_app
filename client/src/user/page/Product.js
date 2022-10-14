import {
  StyleSheet,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ProductCard from '../component/ProductCard';
import Banner from '../../shared/Banner';
import { ScrollView } from 'react-native-gesture-handler';

const data = require('../../asset/data/products.json');

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <ScrollView >
      <Banner />
      <View
        contentContainerStyle={{
          backgroundColor: 'gainsboro',
        }}>
        {products.map(product => (
          <ProductCard key={product._id.$oid} product={product} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({});
