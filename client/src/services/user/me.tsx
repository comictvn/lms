import httpClient from 'services/httpClient'

export function me() {
  return httpClient().get('/v1/users/me')
} 
