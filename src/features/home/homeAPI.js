const api = process.env.REACT_APP_API_URL || '';

export const fetchMessages = (request) => {
    return fetch(
        api + '/api/message/author/' + request.userId,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
        }
    )
    .then((response) => response.json())
}