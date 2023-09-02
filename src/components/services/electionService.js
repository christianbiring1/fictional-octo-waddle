import http from './httpService';

export function getElections() {
  return http.get('http://localhost:3000/api/elections');
}

export function deleteElection(electionId) {
  return http.delete('http://localhost:3000/api/elections/'+ electionId);
}

export function getPositions() {
  return http.get('http://localhost:3000/api/positions');
}

export function deletePosistion(positionId) {
  return http.delete('http://localhost:3000/api/positions/' + positionId);
}
