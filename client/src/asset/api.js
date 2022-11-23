import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: Platform.OS === "android" ? 'http://10.0.2.2:5000/api/v1' : 'http://localhost:6000/api/v1'
});

export default api;
