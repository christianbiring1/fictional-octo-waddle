import http from './httpService';

export function getElectors() {
  return http.get('http://localhost:3000/api/electors');
}

export function deleteElectors(electorId) {
  return http.delete('http://localhost:3000/api/electors/'+ electorId);
}
