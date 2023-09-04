import http from './httpService';

export function getElections() {
  return http.get('http://localhost:3000/api/elections');
}

export function postElection(name, date) {
  return http.post('http://localhost:3000/api/elections', { name, date });

}

export function deleteElection(electionId) {
  return http.delete('http://localhost:3000/api/elections/'+ electionId);
}

export function getPositions() {
  return http.get('http://localhost:3000/api/positions');
}

export function postPosition(name) {
  return http.post('http://localhost:3000/api/positions/', { name });
}

export function deletePosistion(positionId) {
  return http.delete('http://localhost:3000/api/positions/' + positionId);
}
