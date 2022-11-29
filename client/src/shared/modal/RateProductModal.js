import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, Image, TextInput } from 'react-native';
import star_plain from '../../asset/image/star_plain.png';
import star_solid from '../../asset/image/star_solid.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { UserDetails } from '../../redux/reducer/User';

const RateProductModal = ({ isVisible, userStarRating, setShowReviewModal }) => {
  const timesToIterate = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(0);
  const userData = useSelector(UserDetails);

  useEffect(() => {
    setStarRating(userStarRating);
  }, [isVisible, userStarRating]);
  
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        <View style={styles.starContainer}>
          {timesToIterate.map(item => {
            return (
              <Pressable
                key={item}
                onPress={() => {
                  setStarRating(item);
                }}>
                <Image
                  source={starRating >= item ? star_solid : star_plain}
                  style={{width: 35, height: 35}}
                />
              </Pressable>
            );
          })}
        </View>
        <TextInput placeholder="Write comment" style={styles.comment} />
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
  },

  comment:{
    borderWidth: 1
  }
});