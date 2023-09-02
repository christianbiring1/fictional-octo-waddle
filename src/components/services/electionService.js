import http from './httpService';

export function getElections() {
  return http.get('http://localhost:3000/api/elections');
}