import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-4885f.firebaseio.com/'
});

export default instance;
