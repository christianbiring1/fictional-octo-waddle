import { useEffect, useState } from 'react';
import { getCandidates } from '../services/candidateService';

import './user.css'

const MainPage = () => {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      setCandidates(data);
    }

    fetchData()
  }, []);

  console.log(candidates);
  return (
    <div className='user_container'>
      <h1>Welcome to Voty!</h1>

      <div>
        {candidates.map((item) => (
          <div key={item._id} className="card" style={{width: '18rem'}}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">{item.name}</p>
              <p className='card-text'>
                <span>Position: </span>
                <span>{item.position.name}</span> 
              </p>
              <p className='card-text'>
                <span>Party: </span>
                <span>{item.political_party.toUpperCase()}</span>
              </p>
           </div>
           <button type='button' className="btn btn-success">Vote</button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default MainPage;