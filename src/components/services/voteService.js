import http from './httpService';

export function vote(candidateId, electorId) {
  return http.post('http://localhost:3000/api/votes', { candidateId, electorId});
}


export function getVote() {
  return http.get('http://localhost:3000/api/votes');
}
