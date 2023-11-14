import axios from 'axios';

const Axios = axios.create();
Axios.defaults.baseURL = 'http://3.39.17.213/api/';
Axios.defaults.withCredentials = true;

export default Axios;
