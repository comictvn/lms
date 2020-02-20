import httpClient from 'services/httpClient'

export function logout() {
  return httpClient().delete('/v1/authentication/me')
} 
