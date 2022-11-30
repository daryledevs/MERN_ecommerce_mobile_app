import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Image, TextInput } from 'react-native';
import star_plain from '../../asset/image/star_plain.png';
import star_solid from '../../asset/image/star_solid.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { UserDetails } from '../../redux/reducer/User';
import Icon_2 from 'react-native-vector-icons/MaterialIcons';
import api from '../../asset/api';

const RateProductModal = ({
  user_id,
  isVisible,
  product_id,
  userStarRating,
  submitEditReview,
  userCurrentReview,
  setShowReviewModal,
  setSubmitEditReview,
}) => {
  const timesToIterate = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(0);
  const [changeTextReview, setChangeTextReview] = useState("");
  const userData = useSelector(UserDetails);

  useEffect(() => {
    setStarRating(
      userCurrentReview.product_rating
        ? userCurrentReview.product_rating
        : userStarRating,
    );
    setChangeTextReview(userCurrentReview.user_comment);
  }, [isVisible, userStarRating]);

  function SubmitHandler(){
    if(userCurrentReview.review_id){
      api
        .put(`/review/${userCurrentReview.review_id}`, {
          product_rating: starRating,
          user_comment: changeTextReview,
        })
        .then(() => {
          setSubmitEditReview(!submitEditReview);
          setShowReviewModal(false);
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      api.post(`/review/${product_id}/${user_id}`, {
        product_rating: starRating,
        user_comment: changeTextReview,
      })
      .then(() => {
        setSubmitEditReview(!submitEditReview);
        setShowReviewModal(false);
      })
      .catch((error) => {
        console.log(error.message);
      })
    }
  };

  return (
    <Modal
      useNativeDriver={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={() => null}
      transparent={true}>
      <View style={styles.modalContainer}>
        <Pressable onPress={() => setShowReviewModal(false)}>
          <Text style={{fontSize: 25}}>X</Text>
        </Pressable>
        <Text style={{marginVertical: 15, fontWeight: 'bold', fontSize: 18}}>
          Rate and review
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Icon
            name="user-alt"
            color="grey"
            size={33}
            style={{marginHorizontal: 5}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text>
              {userData.given_name} {userData.last_name}
            </Text>
            <Text>{userData.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 16}}>This will be posted in public</Text>
          <Icon_2
            name="error-outline"
            size={17}
            style={{marginHorizontal: 2}}
          />
        </View>
        <View style={styles.starContainer}>
          {timesToIterate.map(item => {
            return (
              <Pressable
                key={item}
                onPress={() => {
                  setStarRating(item);
                }}>
                <Image
                  source={
                    userCurrentReview.product_rating
                      ? userCurrentReview.product_rating >= item
                        ? star_solid
                        : star_plain
                      : starRating >= item
                      ? star_solid
                      : star_plain
                  }
                  style={{width: 35, height: 35}}
                />
              </Pressable>
            );
          })}
        </View>
        <TextInput
          placeholder="Write comment"
          style={styles.comment}
          value={changeTextReview}
          onChangeText={text => setChangeTextReview(text)}
        />
        <Pressable
          onPress={SubmitHandler}
          style={{
            alignSelf: 'center',
            marginTop: 20,
            padding: 10,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: '#6BCB77',
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            Submit
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default RateProductModal;

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: 5,
  },

  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  comment:{
    borderWidth: 1
  }
});