import http from './httpService';

export function getCandidates() {
  return http.get('http://localhost:3000/api/candidates');
}

export function deleteCandidate(candidateId) {
  return http.delete('http://localhost:3000/api/candidates/'+ candidateId);
}
