import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import user_picture from '../../asset/image/user_placeholder.png';
import { remove_product_data } from '../../redux/reducer/Product';
import { UserDetails, userLogout } from '../../redux/reducer/User';
import Icon_edit from "react-native-vector-icons/FontAwesome5";
import Icon_address from 'react-native-vector-icons/FontAwesome';
import Icon_bag from 'react-native-vector-icons/Entypo';
import Icon_ratings from 'react-native-vector-icons/MaterialIcons';
import Icon_logout from 'react-native-vector-icons/MaterialIcons';
import Icon_guide from 'react-native-vector-icons/Foundation';
import DoubleBtnModal from '../../shared/modal/DoubleBtnModal';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(UserDetails);
  const [logoutTrigger, setLogoutTrigger] = useState(false);
  const navigation = useNavigation();

  function logoutHandler() {
    dispatch(userLogout(userDetails._id));
    dispatch(remove_product_data());
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DoubleBtnModal
        showModal={logoutTrigger}
        title="Are you sure you want to leave me?"
        message="I would be sad if you click proceed :("
        Cancel={() => setLogoutTrigger(false)}
        Proceed={logoutHandler}
      />
      <View style={styles.email_name_container}>
        <View style={styles.centerVertically}>
          <View style={styles.userImageContainer}>
            <Image
              source={
                userDetails.image ? {uri: userDetails.image} : user_picture
              }
              style={styles.userImage}
            />
          </View>
          <View style={styles.centerVertically}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 22,
              }}>
              {userDetails.given_name} {userDetails.last_name}
            </Text>
            <Text
              style={{
                color: 'white',
              }}>
              {userDetails.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.profile_buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserDetail')}
          style={styles.btnContainer}>
          <Icon_edit
            style={{
              width: 30,
            }}
            name="user-edit"
            size={20}
          />
          <Text style={styles.mainText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Shipping')}
          style={styles.btnContainer}>
          <Icon_address
            style={{
              width: 30,
            }}
            name="address-card"
            size={20}
          />
          <Text style={styles.mainText}>Shopping Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('Order')}>
          <Icon_bag
            style={{
              width: 30,
            }}
            name="shopping-bag"
            size={22}
          />
          <Text style={styles.mainText}>My Purchases</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer}>
          <Icon_ratings
            style={{
              width: 30,
            }}
            name="star-rate"
            size={22}
          />
          <Text style={styles.mainText}>My Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnContainer}>
          <Icon_guide
            style={{
              width: 30,
            }}
            name="info"
            size={22}
          />
          <Text style={styles.mainText}>Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => setLogoutTrigger(true)}>
          <Icon_logout
            style={{
              width: 30,
            }}
            name="logout"
            size={22}
          />
          <Text style={styles.mainText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserProfile

const styles = StyleSheet.create({
  email_name_container: {
    height: 220,
    paddingBottom: 10,
    backgroundColor: 'orange',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userImageContainer: {
    borderRadius: 100,
    width: 110,
    height: 110,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  userImage: {
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    height: 40,
    margin: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10
  },
  centerVertically: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_buttons: {
    flex: 1,
  },
});