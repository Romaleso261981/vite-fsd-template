import axios from 'axios';

const baseUrl = 'https://fsd-back.up.railway.app';
// 'https://fsd-back.up.railway.app'

const API = axios.create({
  baseURL: `${baseUrl}`,
});

export { API };
