import { useState, useEffect } from "react";
import _ from 'lodash';
import { getCandidates } from "../../services/candidateService";
import ListGroup from "../../common/listGroup";
import { getElections } from "../../services/electionService";
import './styles/result.css'


const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {

    async function fetchData() {
      const { data: candidates } = await getCandidates();
      const { data: elections } = await getElections();
      setCandidates(candidates)
      setElections(elections);
    }

    fetchData();

  }, []);
  const handleElectionSelect = (election)=> {
    setGenre(election);
  };

  const filtered = genre ? candidates.filter(c => c.election._id === genre._id) : candidates;
  

  let candidateWithMostVotes = null;

// Use the reduce method to find the candidate with the most votes
filtered.reduce((maxVotes, candidate) => {
  if (candidate.voice > maxVotes) {
    candidateWithMostVotes = candidate;
    return candidate.voice;
  }
  return maxVotes;
}, 0);

console.log("Candidate with the most votes:", candidateWithMostVotes);

  return (
    <div className="result_container">
      <h1>Results</h1>
      <div className="row">
        <div className="col-2">
          <div className="fw-lighter mb-0">Sort By Election</div>
          <ListGroup
            items={elections}
            selectedItem={genre}
            onItemSelect={handleElectionSelect}
          />
        </div>
        <div className="col">
          <div className="winner_container">
            {candidateWithMostVotes ? (
              <div>
                {[candidateWithMostVotes].map((item) => (
              <div key={item._id} className="card" style={{width: '18rem'}}>
                  <img src={`http://localhost:3000/uploads/${item.photo}`} className="card-img-top" alt={item.name + 'photo'} style={{height: '192px'}} />
                  <div className="card-body">
                    <p className="card-text">
                      <span className="fw-bold">First Name: </span>
                      <span>{_.capitalize(item.first_name)}</span>
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Last Name: </span>
                      <span>{_.capitalize(item.last_name)}</span>
                    </p>
                    <p className="card-text">
                      <span className="fw-bold">Political Party: </span>
                      <span>{item.political_party.toUpperCase()}</span>
                    </p>
                    <p className='card-text'>
                      <span className="fw-bold">Voice: </span>
                      <span>{item.voice}</span>
                    </p>
                </div>
                </div>
            ))}
              </div>
              ) : null}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Photo</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Political Party</th>
                <th scope="col">Position</th>
                <th scope="col">Nber voice</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item._id}>
                  <td scope="row">{index + 1}</td>
                  <td scope="row">
                    <img src={`http://localhost:3000/uploads/${item.photo}`} alt={item.first_name + 'image'} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                  </td>
                  <td scope="row">{_.capitalize(item.first_name)}</td>
                  <td scope="row">{_.capitalize(item.last_name)}</td>
                  <td scope="row">{item.political_party.toUpperCase()}</td>
                  <td scope="row">{_.capitalize(item.position.name)}</td>
                  <td scope="row">{item.voice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="result_container">
      </div>
    </div>
  );
}
 
export default Results;