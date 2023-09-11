import { useState, useEffect } from "react";
import { getCandidates } from "../services/candidateService";
import { getElections } from "../services/electionService";
import { getElectors } from "../services/electorService";
import { getPositions } from "../services/electionService";
import votes from '../../assets/votes.jpeg';
import urne from '../../assets/urne.jpeg';
import elector from '../../assets/electors.jpeg';
import candidate from '../../assets/candidates.webp';

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
            <img src={candidate} className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text fw-bold">Candidates</p>
              <p className='card-text'>
                <span className="fst-italic fw-light">Number of candidates in the db are: </span>
                <span>{candidates.length}</span>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src={urne} className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text fw-bold">Elections</p>
              <p className='card-text'>
                <span className="fst-italic fw-light">Number of elections in the db are: </span>
                <span>{elections.length}</span>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src={elector} className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text fw-bold">Electors</p>
              <p className='card-text'>
                <span className="fst-italic fw-light">Number of electors in the db are: </span>
                <sapn>{electors.length}</sapn>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src={votes} className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text fw-bold">Positions</p>
              <p className='card-text'>
                <span className="fst-italic fw-light">Number of positions in the db are: </span>
                <sapn>{positions.length}</sapn>
              </p>
           </div>
          </div>
      </div>
    </div>
  );
}
 
export default DashBoard;