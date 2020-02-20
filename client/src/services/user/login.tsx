import httpClient from 'services/httpClient'

export function login(email: string, password: string) {
  return httpClient().post('/v1/authentication', {
    email: email,
    password: password,
  })
} 
