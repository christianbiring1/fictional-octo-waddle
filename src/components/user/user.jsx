import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { getCandidatesPerElectors } from '../services/candidateService';
import { getVote ,vote } from '../services/voteService';
import { toast } from 'react-toastify';
import Footer from './footer';

import './user.css'

const MainPage = () => {

  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [result, setResult] = useState([]);
  const elector = JSON.parse(localStorage.getItem("electorInfo"));
  if (!elector) navigate('/user_login');
  // console.log(elector);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidatesPerElectors(elector._id);
      const {data: response} = await getVote();
      setCandidates(data);
      setResult(response);
    }

    fetchData()
  });

  const hideVote = () => {
   return result.some((vote) => vote.elector.id === elector.id);
};

  const handleVote = async (candidateId, electorId) => {

    try {
      await vote(candidateId, electorId);
      toast.success('Your vote have been submitted successfully!');

      setTimeout(() => {
        window.location = "/user"
      }, 1000);
    } catch (error) {
      if (error.response)
        toast.error(error.response.data);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("electorInfo");
    navigate("/user_login")
  };

  return (
    <div className='user_container'>
      <div className="user-top">
        <div className="user_header">
          <h1>Welcome to Voty!</h1>
          <button className="btn btn-primary btn-sm mb-5" onClick={handleLogOut} >LogOut</button>
        </div>
        {hideVote() &&
          <p className='alert alert-info fw-light' style={{width: '50%'}}>You have already voted for this election!. Please come on later for the next one!</p>
        }
      </div>
      {candidates.legth ? (
        <p>We don&apos;t have any election at this time around, Check on later!</p>
      ) : (
        <div className='user_card'>
        {candidates.map((item) => (
          <div key={item._id} className="card" style={{width: '18rem'}}>
            <img src={`http://localhost:3000/uploads/${item.photo}`} className="card-img-top" alt={item.name + 'photo'} style={{height: '192px'}} />
            <div className="card-body">
              <p className='card-text'>
                <span>First Name: </span>
                <span>{_.capitalize(item.first_name)}</span>
              </p>
              <p className='card-text'>
                <span>Last Name: </span>
                <span>{_.capitalize(item.last_name)}</span>
              </p>
              <p className='card-text'>
                <span>Position: </span>
                <span>{item.position.name}</span> 
              </p>
              <p className='card-text'>
                <span>Party: </span>
                <span>{item.political_party.toUpperCase()}</span>
              </p>
           </div>
           {
            !hideVote() && (
            <button 
                type='button'
                className="btn btn-success"
                onClick={() => handleVote(item._id, elector._id)}
              >
                Vote
              </button>
           )}
          </div>
        ))}
      </div>
      )}
      <Footer />
    </div>
  );
}
 
export default MainPage;