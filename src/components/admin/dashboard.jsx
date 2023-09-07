import { useState, useEffect } from "react";
import { getCandidates } from "../services/candidateService";
import { getElections } from "../services/electionService";
import { getElectors } from "../services/electorService";
import { getPositions } from "../services/electionService";
import './dashboard.css';

const DashBoard = () => {
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [electors, setElectors] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: candidates } = await getCandidates();
      const { data: elections } = await getElections();
      const { data: electors } = await getElectors();
      const { data: positions } = await getPositions();

      setCandidates(candidates);
      setElections(elections);
      setElectors(electors)
      setPositions(positions);
    }

    fetchData();

  }, []);

  return (
    <div className="">
      <h1>Admin Dashboard</h1>
      <div className="container">
          <div className="card" style={{width: '18rem'}}>
            <img src='..' className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text">Candidates</p>
              <p className='card-text'>
                <span>Number of candidates in the db are: </span>
                <span>{candidates.length}</span>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src='..' className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text">Elections</p>
              <p className='card-text'>
                <span>Number of elections in the db are: </span>
                <span>{elections.length}</span>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src='..' className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text">Electors</p>
              <p className='card-text'>
                <span>Number of electors in the db are: </span>
                <sapn>{electors.length}</sapn>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src='..' className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text">Positions</p>
              <p className='card-text'>
                <span>Number of positions in the db are: </span>
                <sapn>{positions.length}</sapn>
              </p>
           </div>
          </div>
      </div>
    </div>
  );
}
 
export default DashBoard;