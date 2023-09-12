import http from './httpService';

export function getCandidates() {
  return http.get('http://localhost:3000/api/candidates');
}

export function postCandidate(first_name, last_name,electionId, positionId, political_party, photo) {
  return http.post('http://localhost:3000/api/candidates', {
    first_name, last_name, electionId, positionId, political_party, photo
  },
  {
    headers: {'Content-Type': 'multipart/form-data'}
  }
  )
}

export function deleteCandidate(candidateId) {
  return http.delete('http://localhost:3000/api/candidates/'+ candidateId);
}
