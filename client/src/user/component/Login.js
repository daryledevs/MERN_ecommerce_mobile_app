import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoTokenLoadingState, userLogin} from '../../redux/reducer/User';
import LoadingScreen from '../../shared/LoadingScreen';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const isLoading = useSelector(NoTokenLoadingState);

  const dispatch = useDispatch();

  function loginHandler() {
    dispatch(userLogin({ email, password }));
  }


  return (
    <View style={styles.container} behavior="padding">
      <LoadingScreen isVisible={isLoading} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => console.log('Forgot password')}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginHandler} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignupScreen')}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  inputContainer: {
    width: '80%',
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },

  forgotPassword: {
    margin: 4,
  },
  googleSignIn: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
