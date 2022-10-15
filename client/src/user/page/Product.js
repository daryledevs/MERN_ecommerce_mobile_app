import {
  StyleSheet,
  View,
  Keyboard,
  Text
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../component/ProductCard';
import Banner from '../../shared/Banner';
import { ScrollView, TextInput, } from 'react-native-gesture-handler';
import SearchedProducts from '../component/SearchedProduct';

const data = require('../../asset/data/products.json');

const Product = () => {
  let searchRef = useRef(null);
  const [basedData, setBasedData] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchProduct, setSearchProduct] = useState();
  const [showSearchList, setShowSearchList] = useState(false);
  const [noSearchProduct, setNoSearchProduct] = useState(false);
  
  useEffect(() => {
    setProducts(data);
    setBasedData(data);
  }, []);

  useEffect(() => {
    const filter = basedData.filter(product =>
      product.name
        .toLowerCase()
        .replace(' ', '')
        .includes(search.toLowerCase().replace(' ', '')),
    );

    if (filter.length !== 0) {
      setSearchProduct(filter);
      setNoSearchProduct(false);
    }
    if (filter.length === 0) {
      setNoSearchProduct(true);
      setSearchProduct([]);
    }

    if (searchRef.current?.isFocused()) setShowSearchList(true);
  }, [search, noSearchProduct]);

  useEffect(() => {
    const keyboardIsShownListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowSearchList(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        searchRef.current?.blur();
        setShowSearchList(false);
      },
    );

    return () => {
      keyboardIsShownListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const EmptyListMessage = () => {
    return (
      <View>
        {noSearchProduct && search.length !== 0 ? (
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text style={{fontSize: 16}}>
              I'm sorry, we do not have this item.
            </Text>
          </View>
        ) : (
          searchProduct.map(products => (
            <SearchedProducts key={products._id.$oid} item={products} />
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={showSearchList ? {height: '100%'} : null}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}>
      <View style={styles.searchbarContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchbar}
          onChangeText={text => setSearch(text)}
          value={search}
          ref={reference => (searchRef.current = reference)}
        />
      </View>

      {showSearchList ? (
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={true}
          keyboardShouldPersistTaps="always">
          {search.length === 0 || noSearchProduct ? (
            <EmptyListMessage />
          ) : (
            searchProduct.map(products => (
              <SearchedProducts key={products._id.$oid} item={products} />
            ))
          )}
        </ScrollView>
      ) : (
        <View>
          <Banner />
          <View
            contentContainerStyle={{
              backgroundColor: 'gainsboro',
            }}>
            {products.map(product => (
              <ProductCard key={product._id.$oid} product={product} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  searchbarContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f4ecec',
    flexDirection: 'row',
  },

  searchbar: {
    width: '95%',
    height: 40,
    borderRadius: 200,
    backgroundColor: '#ccc',
    marginLeft: '2%',
  },
});
