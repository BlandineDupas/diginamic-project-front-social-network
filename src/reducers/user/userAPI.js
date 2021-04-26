const api = process.env.REACT_APP_API_URL || '';

export const fetchUser = (request) => {
  return fetch(
      api + '/api/user/' + request.userId,
      {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + request.token
        }
  }
  )
  .then((response) => response.json())
}
