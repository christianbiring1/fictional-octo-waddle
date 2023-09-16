import http from './httpService';

export function getElectors() {
  return http.get('http://localhost:3000/api/electors');
}

export function getSingleElector(electorId) {
  return http.get('http://localhost:3000/api/electors/' + electorId)
}

export function postElector(name, id, province, electionId) {
  return http.post('http://localhost:3000/api/electors', {
    name, id, province, electionId
  });
}

export function postImportElector(file) {
  return http.post('http://localhost:3000/api/electors/upload-excel', {file},
   {
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export function deleteElectors(electorId) {
  return http.delete('http://localhost:3000/api/electors/'+ electorId);
}
