import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import user_picture from '../../asset/image/user_placeholder.png';
import { UserDetails, userLogout } from '../../redux/reducer/User';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(UserDetails);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.email_name_container}>
        <View style={styles.userImageContainer}>
          <Image source={user_picture} style={styles.userImage} />
        </View>
        <Text>Name</Text>
      </View>
      <Text>Phone</Text>
      <Text>Email</Text>
      <Text>Street, Apartment, City, Country</Text>
      <Button
        title="Logout"
        onPress={() => dispatch(userLogout(userDetails._id))}
      />
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