import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom'
import { getCandidates } from '../services/candidateService';
import { getVote ,vote } from '../services/voteService';

import './user.css'
import { toast } from 'react-toastify';

const MainPage = () => {

  // const history = useHistory();
  const [candidates, setCandidates] = useState([]);
  const [result, setResult] = useState([]);
  const elector = JSON.parse(localStorage.getItem("electorInfo"));
  // console.log(elector);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      const {data: response} = await getVote();
      setCandidates(data);
      setResult(response);
    }

    fetchData()
  }, []);

  console.log(result);
  const hideVote = () => {
// TO-DO
    return result.find((m) => elector._id === m.elector._id) ? true : false;
  };

  console.log(hideVote())

  const handleVote = async (candidateId, electorId) => {

    try {
      await vote(candidateId, electorId);
      toast.success('Your vote have been submitted successfully! :-)');

      setTimeout(() => {
        window.location = "/user"
      }, 1000);
    } catch (error) {
      if (error.response)
        toast.error(error.response.data);
    }
    console.log(candidateId, electorId);
  };

  const handleLogOut = () => {
    localStorage.removeItem("electorInfo");
    // history.push('/user_login');
    window.location = "/user_login"
  };

  return (
    <div className='user_container'>
      <h1>Welcome to Voty!</h1>
      <button className="btn btn-primary btn-sm mb-5" onClick={handleLogOut} >LogOut</button>
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
           {
            !hideVote() && 
            <button 
                type='button'
                className="btn btn-success"
                onClick={() => handleVote(item._id, elector._id)}
              >
                Vote
              </button>
           }
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default MainPage;