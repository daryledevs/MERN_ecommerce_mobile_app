import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: Platform.OS === "android" ? 'http://10.0.2.2:5000/api/v1' : 'http://localhost:5000'
});

export default api;
