import axios from 'axios';

const Axios = axios.create();
Axios.defaults.baseURL = 'https://www.kusitms28.store/api/';
Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'access-token',
)}`;
Axios.defaults.withCredentials = true;

export default Axios;
