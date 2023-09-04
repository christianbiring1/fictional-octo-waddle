import http from './httpService';

export function getCandidates() {
  return http.get('http://localhost:3000/api/candidates');
}

export function postCandidate(name, electionId, positionId, political_party, photo) {
  return http.post('http://localhost:3000/api/candidates', {
    name, electionId, positionId, political_party, photo
  });
}

export function deleteCandidate(candidateId) {
  return http.delete('http://localhost:3000/api/candidates/'+ candidateId);
}
