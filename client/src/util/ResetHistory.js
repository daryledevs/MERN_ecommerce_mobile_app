import {
  useFocusEffect,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native'
import React from 'react'

const ResetHistory = (routeName) => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: `${routeName}`}],
          }),
        );
      };
    }, []),
  );
}

export default ResetHistory

const styles = StyleSheet.create({})