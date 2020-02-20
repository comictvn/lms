import axios from 'axios' 

export default function httpClient() {
  let instance = axios.create({
    baseURL: process.env.API_URL + '/api',
  })

  instance.interceptors.request.use(
    config => {
      config.withCredentials = true
      config.headers = { 
        'Content-Type': 'application/json'
      }
      return config
    },
    error => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    response => {
      return response 
    },
    error => {
      return Promise.reject(error.response)
    },
  )

  return instance
}
