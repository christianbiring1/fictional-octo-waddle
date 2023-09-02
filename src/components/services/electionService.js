import http from './httpService';

export function getElections() {
  return http.get('http://localhost:3000/api/elections');
}

export function getPositions() {
  return http.get('http://localhost:3000/api/positions');
}
