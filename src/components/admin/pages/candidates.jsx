import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
// import logo from '../../../assets/react.svg';
// import male from '../../../assets/boy.svg';
// import female from '../../../assets/female.svg';
import { getCandidates, deleteCandidate } from "../../services/candidateService";
import { getElections, getPositions } from "../../services/electionService";
import { useOnClickOutside } from "../../common/useonclickoutside";
import './styles/elections.css';


const Candidates = () => {

  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [positions, setPositions] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      const { data: elections } = await getElections();
      const { data: positions } = await getPositions()
      setCandidates(data);
      setElections(elections);
      setPositions(positions);
    }

    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }
  const handleDelete = async (person) => {
    const originalCandidates = candidates;
    const newCandidates = originalCandidates.filter((c) => c._id !== person._id);
    setCandidates(newCandidates);

    try {
      await deleteCandidate(person._id);
      toast.success('candidate deleted sucessfully.');
    } catch (error) {
      if(error.response && error.response.status === 404 )
      toast.error('This election has already been deleted.');

      setCandidates(originalCandidates);
    }
  };

  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="elections__container">
      <h1>Candidates</h1>
      <div className="create_election">
        <button className='btn btn-primary btn-sm mb-4 mt-2 add' style={{ padding: '0.7rem', borderRadius: '1.5rem' }} onClick={handleCreateOpen}>Add candidate</button>
      </div>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Political Party</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((item, index) => (
              <tr key={item._id}>
                <td scope="row">{index + 1}</td>
                <td scope="row">
                  <img src={item.photo} alt="" />
                </td>
                <td scope="row">{capitalize(item.name)}</td>
                <td scope="row">{capitalize(item.position.name)}</td>
                <td scope="row">{item.political_party.toUpperCase()}</td>
                <td scope="row">
                  <button onClick={() => handleDelete(item)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
        createOpen && 
      <div className="create__form">
        <form action="" ref={ref}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id='name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select" aria-label="Default select example">
              <option className="fw-lighter" selected>select an election</option>
              {elections.map((e) => (
                <>
                  <option value={e._id}>{capitalize(e.name)}</option>
                </>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Position</label>
            <select className="form-select" aria-label="Default select example">
              <option className="fw-lighter" selected>select a position</option>
              {positions.map((p) => (
                <>
                  <option value={p._id}>{capitalize(p.name)}</option>
                </>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="political_party" className="form-label">Political Party</label>
            <input type="text" className="form-control" id='political_party' />
          </div>
          <div className="mb-1">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input type="file" className="form-control" id='photo' style={{ width: '40%'}}/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
export default Candidates;