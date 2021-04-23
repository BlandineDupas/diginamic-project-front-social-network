const api = process.env.REACT_APP_API_URL || '';

export const addUser = (user) => {
  return fetch(
      api + '/api/user',
      {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(user)
      }
  )
  .then((response) => response.json())
}

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
    // .then((response) => response.token ? response : console.log(response.error))
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
