import axios from 'axios'

const api = process.env.REACT_APP_API_URL || '';

export const searchUsers = (request) => {
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

export const answerInvite = (request) => {
    return fetch(
        api + '/api/user/' + request.userId + '/invite',
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
            body: JSON.stringify(request.answer)
        }
    )
    .then((response) => response.json())
}

export const deleteInvite = (request) => {
    console.log(request)
    return fetch(
        api + '/api/user/' + request.userId + '/invite',
        {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
            body: JSON.stringify({receiverId: request.receiverId})
        }
    )
    .then((response) => response.json())
}

export const inviteUser = (request) => {
    return fetch(
        api + '/api/user/' + request.userId + '/invite',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
            body: JSON.stringify({receiverId: request.receiverId})
        }
    )
    .then((response) => response.json())
}
