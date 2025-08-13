import axios from 'axios';

export default axios.create ({
    baseURL: 'https://api.chucknorris.io/jokes/',
    header: {'Content-Type': 'application/json'},
});
