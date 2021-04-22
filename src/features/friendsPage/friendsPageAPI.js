import axios from 'axios'

const api = process.env.REACT_APP_API_URL || '';

export const searchUsers = (request) => {
    console.log(request)
    return axios.get(
        api + '/api/user',
        {
            params: { search: request.search }, // sans json c'est mieux
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
        }
    )
    .then((response) => response.data) // pas besoin de json avec axios
}
