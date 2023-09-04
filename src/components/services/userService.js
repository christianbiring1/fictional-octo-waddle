import http from './httpService';

export function register(user) {
  return http.post('http://localhost:3000/api/users', {
    name: user.name,
    email: user.email,
    password: user.password
  });
}
