import axios from 'axios';

const api = process.env.REACT_APP_API_URL || '';

export const fetchPosts = (request) => {
  return axios.get(
    api + '/api/post/author',
    {
        params: { authors: request.authorArray }, // sans json c'est mieux avec axios
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + request.token
        },
    }
    )
    .then((response) => response.data) // pas besoin de json avec axios
}
