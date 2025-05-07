import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7080/api/auth', 
});

export default API;
