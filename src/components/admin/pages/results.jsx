import { useState, useEffect } from "react";
import { getCandidates } from "../../services/candidateService";

const Results = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const { data: candidates } = await getCandidates();
      setCandidates(candidates)
    }

    fetchData();

  }, []);

  console.log(candidates);

  return (
    <div>
      <h1>Results</h1>
      {candidates.map((item) => (
        <div key={item._id} className="card" style={{width: '18rem'}}>
            <img src={item.photo} className="card-img-top" alt="..." />
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
  );
}
 
export default Results;