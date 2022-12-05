import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserDetails, UserAddress } from '../../redux/reducer/User';
import AddressFillUpModal from '../../shared/modal/AddressFillUpModal';
import Icon from 'react-native-vector-icons/AntDesign';
import api from '../../asset/api';

const Shipping = () => {

  const user_details = useSelector(UserDetails);
  const user_address = useSelector(UserAddress);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(user_details.address_id);

  useEffect(() => {
    api.put(`/users/edit-profile/${user_details._id}`, {
      address_id: defaultAddress,
    })
    .then(() => {
      console.log("Changed default address");
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }, [defaultAddress]);
  
  function DeleteHandler(address_id){
    if(defaultAddress !== address_id){
      api
        .delete(`/user-address/${address_id}`)
        .then(() => {
          console.log("User's address has been deleted");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    } else {
      // prompt modal here that the current address cant be deleted
    }
  };

  return (
    <View style={{flex: 1}}>
      <AddressFillUpModal
        showModal={showAddressModal}
        closeModal={() => setShowAddressModal(!showAddressModal)}
      />

      {user_address?.map(address => {
        return (
          <View style={styles.addressContainer} key={address?._id}>
            <View style={{marginBottom: 5, flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {user_details.given_name} {user_details.last_name}{' '}
              </Text>
              <Text>| {user_details.phone}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>
                {address?.house_number} {address?.street} St., Barangay{' '}
                {address?.barangay}, {address?.subdivision}, {address?.city},{' '}
                {address?.province}, {address?.zip_code}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Pressable style={{marginRight: 8}}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: 'blue'}}>
                  Edit
                </Text>
              </Pressable>

              <Pressable onPress={() => DeleteHandler(address._id)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: 'blue'}}>
                  Delete
                </Text>
              </Pressable>

              {defaultAddress !== address?._id ? (
                <Pressable
                  style={{marginHorizontal: 8}}
                  onPress={() => setDefaultAddress(address?._id)}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, color: 'blue'}}>
                    Set as default
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {defaultAddress === address?._id ? (
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Text
                  style={{
                    marginRight: 5,
                    borderWidth: 1,
                    padding: 4,
                    color: 'orange',
                    borderColor: 'orange',
                  }}>
                  Default
                </Text>
                <Text style={{borderWidth: 1, padding: 4}}>Pickup Address</Text>
              </View>
            ) : null}
          </View>
        );
      })}

      {user_address.length < 3 && (
        <Pressable
          onPress={() => setShowAddressModal(!showAddressModal)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 25,
            backgroundColor: 'white',
          }}>
          <Icon
            name="pluscircleo"
            size={20}
            color="orange"
            style={{marginHorizontal: 5}}
          />
          <Text style={{color: 'orange'}}>Add New Address</Text>
        </Pressable>
      )}
    </View>
  );
}

export default Shipping

const styles = StyleSheet.create({
  addressContainer:{
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10
  },

})