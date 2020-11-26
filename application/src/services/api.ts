import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fierce-island-22648.herokuapp.com'
});

export default api;