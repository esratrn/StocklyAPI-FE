import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stockly-epfmbzcmd9a9fsg3.westeurope-01.azurewebsites.net/api' // dikkat! /api eklendi
});

// JWT Token otomatik ekleniyor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;