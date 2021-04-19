const api = process.env.REACT_APP_API_URL || '';

export const addUser = (user) => {
    return fetch(
        api + '/api/user',
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user })
        }
    ).then((response) => response.json())
}