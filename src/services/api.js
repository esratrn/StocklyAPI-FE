import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stockly-epfmbzcmd9a9fsg3.westeurope-01.azurewebsites.net'
});

export default API;
