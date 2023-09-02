import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from '../../common/useonclickoutside';
import { getElections } from '../../services/electionService';

const Election = (props) => {
  const { capitalize } = props;
  
  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, createOpen, () => setCreateOpen(false))
  useEffect(() => {

    async function fetchData() {
      const { data } = await getElections();
      setElections(data);
    }
    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

   const handleDelete = (election) => {
    const newElections = elections.filter((m) => m.id !== election.id);
    setElections(newElections);
  };
  return (
    <div>
      <button className='btn btn-primary btn-sm mb-4 mt-2 add'
          style={{ padding: '0.7rem', borderRadius: '1.5rem' }}
          onClick={handleCreateOpen}
          >
            Create New Election
        </button>
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
                <button onClick={() => handleDelete(item)}
                className="btn btn-danger btn-sm"
                >
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
 
export default Election;