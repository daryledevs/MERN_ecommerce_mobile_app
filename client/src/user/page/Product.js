import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { ScrollView, TextInput, } from 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
// asset
import FilterIcon from '../../asset/image/filter-v1.png';
// component
import Banner from '../../shared/others/Banner';
import ProductCard from '../component/ProductCard';
import SearchedProducts from '../component/SearchedProduct';
import { useSelector } from 'react-redux';
import { categoryState, productState } from '../../redux/reducer/Product';
import Header from '../../shared/others/Header';

const Product = () => {
  // Search
  let searchRef = useRef(null);
  const [basedData, setBasedData] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchProduct, setSearchProduct] = useState();
  const [showSearchList, setShowSearchList] = useState(false);
  const [noSearchProduct, setNoSearchProduct] = useState(false);
  // category
  const chosenCategory = useRef([]);
  const [category, setCategory] = useState([]);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [noCategoryFound, setNoCategoryFound] = useState(false);
  // data
  const productData = useSelector(productState);
  const categoryData = useSelector(categoryState);

  useEffect(() => {
    setProducts(productData);
    setBasedData(productData);
    setCategory(categoryData);
  }, []);

  useEffect(() => {
    const filter = basedData.filter(product =>
      product.product.name
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

  const categoryItem = (item_name, item_id) => {
    if (
      !chosenCategory.current.some(
        element => element.categoryName === item_name,
      )
    ) {
      let prev_values = chosenCategory.current;
      prev_values = [
        ...prev_values,
        {categoryName: item_name, categoryId: item_id},
      ];
      chosenCategory.current = [...prev_values];
    } else {
      const prev_values = chosenCategory.current.filter(
        chosen => chosen.categoryName !== item_name,
      );
      chosenCategory.current = [...prev_values];
      if (chosenCategory.current.length === 0) setNoCategoryFound(false);
    }

    if (chosenCategory.current.length === 0) return setProducts(productData);

    const relatedCategory = basedData.filter(product =>
      chosenCategory.current.some(
        ({categoryId}) => categoryId === product.product.category._id,
      ),
    );

    if (relatedCategory.length !== 0) setNoCategoryFound(false);
    if (relatedCategory.length === 0) setNoCategoryFound(true);
    setProducts(relatedCategory);
  };

  const FilterModal = () => {
    return (
      <Modal transparent={true} visible={triggerFilter} animationType="fade">
        <View style={modalStyle.modalBackground}>
          <View style={modalStyle.modalContainer}>
            <Text>Categories</Text>
            <TouchableOpacity onPress={() => setTriggerFilter(!triggerFilter)}>
              <Text>Close</Text>
            </TouchableOpacity>
            <FlatList
              data={category}
              keyExtractor={item => '_' + item._id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    categoryItem(item.name, item._id)
                  }
                  style={{borderWidth: 1, marginBottom: 5}}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

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
            <SearchedProducts key={products.product._id + "_"} item={products} />
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={
        showSearchList
          ? {height: '100%'}
          : {flex: 1, backgroundColor: 'gainsboro'}
      }
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}>
      <Header />
      <FilterModal />

      <View style={styles.searchbarContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchbar}
          onChangeText={text => setSearch(text)}
          value={search}
          ref={reference => (searchRef.current = reference)}
        />

        <TouchableOpacity
          style={{marginHorizontal: '2%'}}
          onPress={() => setTriggerFilter(!triggerFilter)}>
          <Image source={FilterIcon} style={{width: 25, height: 25}} />
        </TouchableOpacity>
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
              <SearchedProducts key={products._id} item={products} />
            ))
          )}
        </ScrollView>
      ) : (
        <ScrollView>
          <Banner />
          {noCategoryFound ? (
            <Text>No item for this category.</Text>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {products.map(product => (
                <ProductCard
                  key={product.product._id}
                  product={product.product}
                />
              ))}
            </View>
          )}
        </ScrollView>
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
    width: '87%',
    height: 40,
    borderRadius: 200,
    backgroundColor: '#ccc',
    marginLeft: '2%',
  },
});

const modalStyle = StyleSheet.create({
  modalBackground: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },

  modalContainer: {
    width: '70%',
    height: '100%',
    backgroundColor: 'white',
  },
});

