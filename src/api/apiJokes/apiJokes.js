import axios from '../service';

const apiJokes = {
    get: (endpoint, params = {}) => axios.get(`/${endpoint}`, { params })
    .then(({ data }) => data)
    .catch((err) => {
        throw new Error(err);
      }),
};

export { apiJokes };