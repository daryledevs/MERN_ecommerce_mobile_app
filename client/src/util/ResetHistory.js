import {
  useFocusEffect,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import React, { useCallback } from 'react';

const ResetHistory = (routeName) => {
  const navigation = useNavigation();

  const clearNavigationHistory = useCallback(() => {
    return () => {
      navigation.dispatch(state => {
        return CommonActions.reset({
          index: 0,
          routes: [{ name: `${routeName}` }],
        });
      });
    };
  }, [routeName]);

  useFocusEffect(clearNavigationHistory);
};

export default ResetHistory;

const styles = StyleSheet.create({});
