import { useEffect, useRef, useState } from 'react';
import { getElections } from '../../services/electionService';
import { useOnClickOutside } from '../../common/useonclickoutside';
import './styles/elections.css';


const Elections = () => {

  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {

    async function fetchData() {
      const { data } = await getElections();
      setElections(data);
    }
    fetchData();
  }, [])

  useOnClickOutside(ref, createOpen, () => setCreateOpen(false))

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

  const handleDelete = (election) => {
    const newElections = elections.filter((m) => m.id !== election.id);
    setElections(newElections);
  };


  // if(!elections.length) return(
  //   <div className="elections__container">
  //     <h1>Elections</h1>
  //     <div className="create_election">
  //       <button className='btn btn-primary btn-sm mb-4 mt-2 add' style={{ padding: '0.7rem', borderRadius: '1.5rem' }} onClick={handleCreateOpen}>Create New Election</button>
  //     </div>
  //     <div className='no_election'>
  //       <h4 className='fw-lighter'>There is no available election for now</h4>
  //     </div>
  //   </div>
  // )
  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);


  return (
    <div className="elections__container">
      <h1>Elections</h1>
      <div className="create_election">
        <button className='btn btn-primary btn-sm mb-4 mt-2 add' style={{ padding: '0.7rem', borderRadius: '1.5rem' }} onClick={handleCreateOpen}>Create New Election</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {elections.map((item, index) => (
            <tr key={item._id}>
              <td scope="row">{index + 1}</td>
              <td scope="row">{capitalize(item.name)}</td>
              <td scope="row">{item.date}</td>
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
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Election Name</label>
            <input type="text" className="form-control" id='name'/>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input type="date" className="form-control" id='date' style={{width: '40%'}}/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }

    </div>
  );
}
 
export default Elections;