const api = process.env.REACT_APP_API_URL || '';

export const logUser = (user) => {
    return fetch(
        api + '/api/login',
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        }
    )
    .then((response) => response.json())
    .then((response) => response.token ? response : console.log(response.error))
}