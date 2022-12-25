import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { edit_profile, UserDetails } from "../../redux/reducer/User";
import user_picture from '../../asset/image/user_placeholder.png';
import api from '../../asset/api';
import Icon from 'react-native-vector-icons/AntDesign';
import UserDetailModal from '../../shared/modal/UserDetailModal';

const UserDetail = () => {
  const dispatch = useDispatch();
  const user_details = useSelector(UserDetails);
  const [img, setImg] = useState(user_details?.image);
  const [editTrigger, setEditTrigger] = useState(false);
  const [fieldValue, setFieldValue] = useState("");


  const user_details_arr = [
    {
      detail_key: {
        given_name: user_details?.given_name,
        last_name: user_details?.last_name,
      },
      default_value: 'name',
    },
    {detail_key: user_details?.phone, default_value: 'phone'},
    {detail_key: user_details?.gender, default_value: 'gender'},
    {
      detail_key: user_details?.birthday && new Date(user_details?.birthday).toLocaleDateString(),
      default_value: 'birthday',
    },
  ];

  function choosePic() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(async image => {
        try {
          const imageName = image.path.substring(
            image.path.lastIndexOf('/') + 1,
          );
          const bucketFile = `users/${imageName}`;
          const pathToFile = image.path;
          await storage().refFromURL(img).delete(); 
          await storage().ref(bucketFile).putFile(pathToFile);
          const url = await storage().ref(bucketFile).getDownloadURL();
          setImg(url)
          
          await api.put(`/users/edit-profile/${user_details?._id}`, {
            image: url
          });
          
          dispatch(edit_profile({ image: url }));
        } catch (error) {
          console.log(error.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  function displayDetail(detail_key, default_value) {
    return detail_key && Object.keys(detail_key).length === 2
      ? `${detail_key.given_name} ${detail_key.last_name}`
      : detail_key
      ? detail_key
      : default_value.charAt(0).toUpperCase() + default_value.slice(1);
  }

  return (
    <View>
      {/* 
        it renders before the editTrigger being set to true.  
         That's why the value doesn't change.
      */}
      {fieldValue.length !== 0 && editTrigger && (
        <UserDetailModal
          showModal={editTrigger}
          CloseModal={() => setEditTrigger(false)}
          currentValue={fieldValue.detail_key}
          defaultValue={fieldValue.default_value}
        />
      )}
      <Pressable onPress={choosePic} style={styles.imageContainer}>
        <Image source={img ? {uri: img} : user_picture} style={styles.image} />
        <Text style={styles.tapToChange}>Tap to change</Text>
      </Pressable>

      {user_details_arr.map(({detail_key, default_value}, index) => {
        return (
          <TouchableOpacity
            style={styles.field}
            key={index}
            onPress={() => {
              setFieldValue({ detail_key, default_value });
              setEditTrigger(true);
            }}>
            <Text>{displayDetail(detail_key, default_value)}</Text>
            <Icon name="right" size={15} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '45%',
    backgroundColor: 'orange',
  },

  image: {
    borderRadius: 100,
    width: 110,
    height: 110,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 8,
  },

  tapToChange: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },

  field:{
    backgroundColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
