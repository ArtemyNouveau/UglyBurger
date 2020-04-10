import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://burger-4885f.firebaseio.com/'
});

export default axiosInstance;
