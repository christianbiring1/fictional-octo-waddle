import http from './httpService';

export function login(email, password) {
  return http.post('http://localhost:3000/api/auth', { email, password});
}

