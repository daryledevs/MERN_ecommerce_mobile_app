import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Like_product } from '../../redux/reducer/Wishlist';
import placeholder from '../../asset/image/placeholder.png';
import star from '../../asset/image/star.png';
import heart_check from '../../asset/image/heart_check.png';
import { like_unlike } from '../../redux/action/Wishlist';
import Header from '../../shared/others/Header';

const Wishlist = () => {
  const wishlist = useSelector(Like_product);
  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <View style={styles.wishlistContainer}>
        {wishlist.length === 0 ? (
          <View style={styles.noWishlist}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginBottom: 5,
              }}>
              It seems no displayed items here...
            </Text>
            <Text
              style={{paddingHorizontal: 5, textAlign: 'center', fontSize: 18}}>
              Let's like some products from the homepage!{' '}
              <Image source={heart_check} style={styles.heart} />
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{alignItems: 'center', width: '100%'}}>
            {wishlist.map(item => {
              return (
                <View key={item._id} style={styles.wishlistCard}>
                  <Image source={placeholder} style={styles.productImg} />
                  <View style={styles.productDetails}>
                    <Text>{item.product_id?.name}</Text>
                    <Text>{item.product_id?.brand}</Text>
                    <Text>₱{item.product_id?.price}</Text>
                    <Text>
                      {/* format: total score and number of reviews */}
                      <Image source={star} style={styles.reviewImg} /> (4.5) 160
                    </Text>
                    <Pressable
                      style={{
                        marginBottom: 5,
                        marginTop: 'auto',
                        alignSelf: 'center',
                      }}
                      onPress={() =>
                        dispatch(
                          like_unlike({
                            product: item.product_id,
                            userId: item.user_id,
                          }),
                        )
                      }>
                      <Image source={heart_check} style={styles.heart} />
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default Wishlist

const styles = StyleSheet.create({
  wishlistContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
  },

  wishlistCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '60%',
    margin: 5,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  productImg: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
    flex: 2,
  },

  productDetails: {
    flex: 2,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },

  reviewImg: {
    width: 15,
    height: 15,
  },

  heart: {
    width: 20,
    height: 20,
  },

  noWishlist: {
    width: '70%',
    height: '30%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
});