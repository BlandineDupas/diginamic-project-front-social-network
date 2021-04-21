const api = process.env.REACT_APP_API_URL || '';

export const sendMessage = (request) => {
    return fetch(
        api + '/api/message',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
            body: JSON.stringify(request.messageData)
        }
    )
    .then((response) => response.json())
}