import axios from 'axios';

const Axios = axios.create();
// Axios.defaults.baseURL = 'https://www.kusitms28.store/api/';
Axios.defaults.baseURL = 'http://3.35.186.14:8080/';
Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'access-token',
)}`;
Axios.defaults.withCredentials = true;

export default Axios;
