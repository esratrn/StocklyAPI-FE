import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.49:7080/api/auth', 
});

export default API;
