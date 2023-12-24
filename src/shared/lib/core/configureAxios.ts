import axios from 'axios';

export default function makeApi(baseURL: string) {
  const api = axios.create({
    baseURL,
  });

  api.defaults.headers.post['Content-Type'] = 'application/json';
  api.defaults.headers.put['Content-Type'] = 'application/json';
  api.defaults.headers.delete['Content-Type'] = 'application/json';

  api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
  );

  return api;
}
