import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto"; //eslint-disable-line
import _ from 'lodash';
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

  const electionData = {
    labels: elections.map((e) => _.capitalize(e.name)), // Election names
    datasets: [
      {
        label: 'Number of Candidates',
        data: elections.map((election) =>
          candidates.filter((candidate) => candidate.election._id === election._id).length), // Number of candidates for each election
        backgroundColor: 'rgba(13, 110, 253, 0.8)'/*'rgba(75, 192, 192, 0.6)', // Customize the color */,
        borderColor: 'black',
        borderWidth: 2
      },
    ],
  };

  const electorsData = {
    labels: elections.map((e) => _.capitalize(e.name)),
    datasets: [
      {
        label: 'Number of Electors',
        data: elections.map((election) =>
          electors.filter((el) => el.election._id === election._id).length),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'black',
        borderWidth: 2
      },
    ],
  };
  const options = {
  scales: {
    x: {
      ticks: {
        color: 'red', // Change the color of the x-axis labels
      },
    },
    y: {
      ticks: {
        color: 'blue', // Change the color of the y-axis labels
      },
    },
  },
};

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
                <span>{electors.length}</span>
              </p>
           </div>
          </div>
          <div className="card" style={{width: '18rem'}}>
            <img src={votes} className="card-img-top" alt= 'election-photo' style={{height: '192px'}} />
            <div className="card-body">
              <p className="card-text fw-bold">Positions</p>
              <p className='card-text'>
                <span className="fst-italic fw-light">Number of positions in the db are: </span>
                <span className="fw-bold">{positions.length}</span>
              </p>
           </div>
          </div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '50%'}}>
        <Bar data={electionData} options={options}/>
        </div>
        <div style={{width: '50%'}}>
        <Bar data={electorsData} />
        </div>
      </div>
    </div>
  );
}
 
export default DashBoard;