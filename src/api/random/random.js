import axios from '../service';

const random = {
    get: () => axios.get('/random')
    .then(({ data }) => data)
    .catch((err) => {
        throw new Error(err);
      }),
};

export { random };