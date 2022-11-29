import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import user_picture from '../../asset/image/user_placeholder.png';
import { remove_product_data } from '../../redux/reducer/Product';
import { UserDetails, userLogout } from '../../redux/reducer/User';
import Header from '../../shared/others/Header';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(UserDetails);

  function logoutHandler(){
    dispatch(userLogout(userDetails._id));
    dispatch(remove_product_data());
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header/>
      <View style={styles.email_name_container}>
        <View style={styles.userImageContainer}>
          <Image source={user_picture} style={styles.userImage} />
        </View>
        <Text>
          {userDetails.given_name} {userDetails.last_name}
        </Text>
      </View>
      <Text>Phone: {userDetails.phone}</Text>
      <Text>Email: {userDetails.email}</Text>
      <Text>Street, subdivision, City, Country</Text>
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
}

export default UserProfile

const styles = StyleSheet.create({
  email_name_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: "center"
  },
  userImageContainer: {
    borderRadius: 100,
    width: 60,
    height: 60,
    overflow: 'hidden',
    backgroundColor: "white"
  },
  userImage: {
    height: '100%',
    width: '100%',
  },
});