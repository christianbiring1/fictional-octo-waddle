import { useState, useEffect } from "react";
import { getCandidates } from "../../services/candidateService";
import './styles/result.css'
const Results = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const { data: candidates } = await getCandidates();
      setCandidates(candidates)
    }

    fetchData();

  }, []);

  return (
    <div>
      <h1>Results</h1>
      <div className="result_container">
        {candidates.map((item) => (
          <div key={item._id} className="card" style={{width: '18rem'}}>
              <img src={`http://localhost:3000/uploads/${item.photo}`} className="card-img-top" alt={item.name + 'photo'} style={{height: '192px'}} />
              <div className="card-body">
                <p className="card-text">
                  <span>Name: </span>
                  <span>{item.name}</span>
                </p>
                <p className="card-text">
                  <span>Political Party: </span>
                  <span>{item.political_party}</span>
                </p>
                <p className='card-text'>
                  <span>Voice: </span>
                  <span>{item.voice}</span>
                </p>
            </div>
            </div>
        ))}

      </div>
    </div>
  );
}
 
export default Results;