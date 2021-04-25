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

export const sendPost = (request) => {
  return fetch(
    api + '/api/post',
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + request.token
        },
        body: JSON.stringify(request.postData)
    }
)
.then((response) => response.json(response))
}
