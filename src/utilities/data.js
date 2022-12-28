import axios from 'axios'

export function fetchData (url, auth_header) {
  const options = {
    headers: {
      "Authorization": `Bearer ${auth_header}`
    }
  }

  return axios.get(`${process.env.REACT_APP_BASE_URL}${url}`, options)
    .then((response) => response.data)
    .catch((error) => error)
}

export function auth (url, user, pass) {
  return axios.post(`${process.env.REACT_APP_BASE_URL}${url}`,{
    username: user,
    password: pass
  }).then((response) => response.data)
    .catch((error) => error)
}
