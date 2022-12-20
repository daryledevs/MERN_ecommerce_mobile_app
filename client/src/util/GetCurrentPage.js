import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { get_current_page } from '../redux/reducer/RouteNavigation';

const GetCurrentPage = ({ on, off }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(get_current_page(on));
      return () => {
        dispatch(get_current_page(off));
      };
    }, [off]),
  );
};

export default GetCurrentPage;
