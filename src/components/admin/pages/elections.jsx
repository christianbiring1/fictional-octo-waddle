import { useState } from 'react';
import './styles/elections.css';


const Elections = () => {

  const [elections, setElections] = useState([
    {
      id: 1,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 2,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 3,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 4,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 5,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 6,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 7,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    },
    {
      id: 8,
      name: 'Whatever',
      date: '2023/ 12/ 03'
    }
  ])
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

  const handleDelete = (election) => {
    const newElections = elections.filter((m) => m.id !== election.id);
    setElections(newElections);
  };

  // if(!elections.length) return
  return (
    <div className="elections__container">
      <div className="create_election">
      </div>
      <h1>Elections page</h1>
        <button className='btn btn-primary btn-sm mb-4 mt-2 add' style={{ padding: '0.7rem', borderRadius: '1.5rem' }} onClick={handleCreateOpen}>Create New Election</button>
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
            <tr key={item.id}>
              <td scope="row">{index + 1}</td>
              <td scope="row">{item.name}</td>
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
        <form action="">
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