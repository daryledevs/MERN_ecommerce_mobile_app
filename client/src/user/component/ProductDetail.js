import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import placeholder from '../../asset/image/placeholder.png';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducer/Cart';
import GetCurrentPage from '../../util/GetCurrentPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../asset/api';
import { UserDetails } from '../../redux/reducer/User';
import { like_unlike } from '../../redux/action/Wishlist';
import star_plain from '../../asset/image/star_plain.png';
import star_solid from '../../asset/image/star_solid.png';
import star_half from '../../asset/image/star_half.png';
import RateProductModal from '../../shared/modal/RateProductModal';
import LoadingScreen from '../../shared/loading/LoadingScreen';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const userData = useSelector(UserDetails);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isDoneGetStatus, setIsDoneGetStatus] = useState(false);
  const [isDoneGetComment, setIsDoneGetComment] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [saveStarRating, setSaveStarRating] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productReview, setProductReview] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [submitEditReview, setSubmitEditReview] = useState(false);
  const [userReview, setUserReview] = useState({
    review_id: "",
    product_rating: 0,
    user_comment: '',
  });

  const timesToIterate = [1, 2, 3, 4, 5];

  GetCurrentPage('Homepage');
  
  useEffect(() => {
    api.get(`/likes/status/${product._id}/${userData._id}`)
    .then((res) => {
      setIsInWishlist(res.data.isLike);
      setIsDoneGetStatus(true);
    });
  }, []);

  useEffect(() => {
    setIsDoneGetComment(false);
    api.get(`review/${product._id}`).then(res => {
      setProductReview(res.data);
      setIsDoneGetComment(true);
    });
  }, [submitEditReview]);

  useEffect(() => {
    if(!showReviewModal) setSaveStarRating(0);
    setStarRating(0);
  }, [starRating, showReviewModal]);

  function DeleteReview(){
    api
      .delete(`/review/${productReview.reviews[0]._id}`)
      .then(() => {
        setSubmitEditReview(!submitEditReview);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const UserReviewContainer = () => {

    const user_review = productReview.reviews.find(
      review => review.user_id._id === userData._id,
    );

    return (
      <View style={styles.userReviewContainer}>
        {productReview.reviews.some(
          review => review.user_id._id === userData._id,
        ) ? (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="user"
                color="grey"
                size={25}
                style={{marginHorizontal: 5}}
              />
              <Text>
                {user_review.user_id.given_name} {user_review.user_id.last_name}
              </Text>
            </View>
            <View style={{padding: 5}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {timesToIterate.map(item => {
                  return (
                    <View key={item}>
                      <Image
                        source={
                          user_review.product_rating >= item
                            ? star_solid
                            : star_plain
                        }
                        style={{width: 12, height: 12, margin: 1}}
                      />
                    </View>
                  );
                })}
                <Text style={{marginLeft: 5}}>
                  {new Date(user_review.comment_date).toLocaleDateString()}
                </Text>
              </View>
              <Text>{user_review.user_comment}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  style={{ marginRight: 10}}
                  onPress={() => {
                    setUserReview({
                      review_id: user_review._id,
                      product_rating: user_review.product_rating,
                      user_comment: user_review.user_comment,
                    });
                    setShowReviewModal(true);
                  }}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'blue',
                      alignSelf: 'flex-start',
                    }}>
                    Edit review
                  </Text>
                </Pressable>
                <Pressable
                  onPress={DeleteReview}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'blue',
                      alignSelf: 'flex-start',
                    }}>
                    Delete review
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Rate this product
            </Text>
            <Text>
              Review will be shown in public including the name and message.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              {timesToIterate.map(item => {
                return (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setStarRating(item);
                      setTimeout(() => {
                        // place a setTimeout to see star being clicked first
                        setShowReviewModal(true);
                        setSaveStarRating(item);
                      }, 500);
                    }}>
                    <Image
                      source={starRating >= item ? star_solid : star_plain}
                      style={{width: 35, height: 35}}
                    />
                  </Pressable>
                );
              })}
            </View>
            <Pressable onPress={() => setShowReviewModal(true)}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'blue',
                  alignSelf: 'flex-start',
                }}>
                Write a review
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const RatingsAndReview = () => {
    return (
      <View style={styles.ratingsAndReview}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 5,
          }}>
          Ratings and reviews
        </Text>
        <View style={styles.overAllReviews}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 40, lineHeight: 44}}>
              {productReview.total_ratings}
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 5}}>
              {timesToIterate.map(item => {
                return (
                  <Pressable key={item}>
                    <Image
                      source={
                        productReview.total_ratings >= item
                          ? star_solid
                          : productReview.total_ratings % 1 === 0
                          ? star_plain
                          : star_half
                      }
                      style={{width: 12, height: 12, margin: 1}}
                    />
                  </Pressable>
                );
              })}
            </View>
            {/* NUMBER OF REVIEWS */}
            <Text>{productReview.total_review}</Text>
          </View>
          <View style={{flex: 1, paddingRight: 25}}>
            {[
              { ratingNum: 5, percent: `${productReview?.five_star}%`  },
              { ratingNum: 4, percent: `${productReview?.four_star}%`   },
              { ratingNum: 3, percent: `${productReview?.three_star}%` },
              { ratingNum: 2, percent: `${productReview?.two_star}%`  },
              { ratingNum: 1, percent: `${productReview?.one_star}%`   },
            ].map(item => {
              return (
                <View
                  key={item.ratingNum}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginHorizontal: 5}}>{item.ratingNum}</Text>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#ccc',
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        width: `${item.percent}`,
                        borderRadius: 10,
                        height: 5,
                        backgroundColor: 'green',
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const CommentSection = () => {
    return (
      <View style={styles.mainCommentSection}>
        {productReview.reviews.length !== 0 ? (
          productReview.reviews.map(review => {
            return (
              <View key={review._id} style={{padding: 5}}>
                {review.user_id._id !== userData._id && (
                  <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        name="user"
                        color="grey"
                        size={25}
                        style={{marginHorizontal: 5}}
                      />
                      <Text>
                        {review.user_id.given_name} {review.user_id.last_name}
                      </Text>
                    </View>
                    <View style={{padding: 5}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {timesToIterate.map(item => {
                          return (
                            <View key={item}>
                              <Image
                                source={
                                  review.product_rating >= item
                                    ? star_solid
                                    : star_plain
                                }
                                style={{width: 12, height: 12, margin: 1}}
                              />
                            </View>
                          );
                        })}
                        <Text style={{marginLeft: 5}}>
                          {new Date(review.comment_date).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text>{review.user_comment}</Text>
                    </View>
                  </>
                )}
              </View>
            );
          })
        ) : (
          <View style={{
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>No other reviews yet...</Text>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Be the first one to give review!</Text>
          </View>
        )}
      </View>
    );
  };

  if(!isDoneGetStatus) return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <RateProductModal
        product_id={product._id}
        user_id={userData._id}
        isVisible={showReviewModal}
        userCurrentReview={userReview}
        userStarRating={saveStarRating}
        submitEditReview={submitEditReview}
        setShowReviewModal={setShowReviewModal}
        setSubmitEditReview={setSubmitEditReview}
      />
      <ScrollView>
        <View style={{paddingBottom: 15}}>
          <Image source={placeholder} style={styles.productImage} />
          <View style={styles.name_brand_container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>{product.brand}</Text>
            <Text style={styles.title}>₱{product.price}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              paddingHorizontal: 10,
              borderColor: 'gray',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Seller:{' '}
                {product.product_seller ? product.product_seller : 'NO NAME'}
              </Text>
              <View style={{justifyContent: 'center', marginLeft: 'auto'}}>
                <Text style={{fontSize: 11, textAlign: 'center'}}>
                  QTY: {product.quantity_stock}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <Pressable
                    onPress={() =>
                      itemQuantity > 1
                        ? setItemQuantity(prev => prev - 1)
                        : null
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 5,
                      alignSelf: 'center',
                    }}>
                    <Icon
                      name="minus"
                      size={20}
                      style={{marginHorizontal: 5}}
                    />
                  </Pressable>
                  <View
                    style={{
                      flexDirection: 'column',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        width: 40,
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}>
                      {itemQuantity}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      itemQuantity < product.quantity_stock
                        ? setItemQuantity(prev => prev + 1)
                        : null
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 5,
                      alignSelf: 'center',
                    }}>
                    <Icon name="plus" size={20} style={{marginHorizontal: 5}} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Text style={styles.title}>Description</Text>
            <Text>
              {product.description.length === 0
                ? 'No description for this product.'
                : product.description}
            </Text>
          </View>
        </View>

        {isDoneGetComment ? (
          <>
            <UserReviewContainer />
            <RatingsAndReview />
            <CommentSection />
          </>
        ) : (
          <View
            style={{
              height: 121,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.wishlistBtn}
          onPress={() => {
            setIsInWishlist(!isInWishlist);
            dispatch(like_unlike({product: product, userId: userData._id}));
          }}>
          <Icon name="heart" size={21} color="white" />
          <Text style={styles.textTab}>Wishlist</Text>
        </Pressable>
        <Pressable
          style={styles.cartBtn}
          onPress={() =>
            dispatch(addToCart({product, itemQuantity, user_id: userData._id}))
          }>
          <Icon name="cart-plus" size={25} color="white" />
          <Text style={styles.textTab}>Add to cart</Text>
        </Pressable>
        <Pressable
          style={styles.buyBtn}
          onPress={() =>
            dispatch(addToCart({product, itemQuantity, user_id: userData._id}))
          }>
          <Text style={styles.textTab}>Buy Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  name_brand_container: {
    alignItems: 'center',
    borderColor: '#ccc',
  },

  productImage: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 'auto',
    height: '8%',
  },

  wishlistBtn: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    borderColor: '#ccc',
  },

  cartBtn: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6BCB77',
    borderColor: '#ccc',
  },

  buyBtn: {
    flex: 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6BCB77',
    borderColor: '#ccc',
  },

  textTab: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },

  userReviewContainer: {
    padding: 5,
    marginVertical: 10,
  },

  userCommentSection: {
    flexDirection: 'row',
    borderColor: 'red',
  },

  overAllReviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingsAndReview: {
    marginVertical: 15,
    paddingRight: 5
  },
});