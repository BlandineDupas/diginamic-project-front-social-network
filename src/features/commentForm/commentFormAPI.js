const api = process.env.REACT_APP_API_URL || '';

export const sendComment = (request) => {
    return fetch(
        api + '/api/comment',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + request.token
            },
            body: JSON.stringify(request.commentData)
        }
    )
    .then((response) => response.json())
}