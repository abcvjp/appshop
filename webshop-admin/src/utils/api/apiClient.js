import axios from 'axios';

// Set up default config for http requests
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('auth_token')
      ? `Bearer ${localStorage.getItem('auth_token')}`
      : '',
  },
  responseType: 'json'
});

export default API;
