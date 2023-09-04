import { useEffect, useState } from 'react';
import { getCandidates } from '../services/candidateService';
import { getVote ,vote } from '../services/voteService';

import './user.css'
import { toast } from 'react-toastify';

const MainPage = () => {
  const [candidates, setCandidates] = useState([]);
  const elector = JSON.parse(localStorage.getItem("electorInfo"));
  // console.log(elector);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      setCandidates(data);
    }

    fetchData()
  }, []);

  // console.log(candidates);

  const handleVote = async (candidateId, electorId) => {

    try {
      await vote(candidateId, electorId);
      toast.success('Your vote have been submitted successfully! :-)')
    } catch (error) {
      if (error. response && error.response.status === 400)
        toast.error(error.response.data);
    }
    console.log(candidateId, electorId);
  }
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
           <button 
              type='button'
              className="btn btn-success"
              onClick={() => handleVote(item._id, elector._id)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default MainPage;