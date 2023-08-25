import { useRef, useState } from "react";
import logo from '../../../assets/react.svg';
import male from '../../../assets/boy.svg';
import female from '../../../assets/female.svg';

import './styles/elections.css';
import { useOnClickOutside } from "../../common/useonclickoutside";


const Candidates = () => {

  const [createOpen, setCreateOpen] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));

  const [persons, setPersons] = useState([
    {
      id: 1,
      photo: male,
      name: 'Williams Doe',
      position: 'Deputy',
      political_party: 'UNIC'
    },
    {
      id: 2,
      photo: female,
      name: 'Jane Doe',
      position: 'Deputy',
      political_party: 'UNIC'
    },
    {
      id: 3,
      photo: logo,
      name: 'Williams Doe',
      position: 'Deputy',
      political_party: 'UNIC'
    },
  ])


  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }
  const handleDelete = (person) => {
    const newPersons = persons.filter((c) => c.id !== person.id);
    setPersons(newPersons);
  };

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
            {persons.map((item, index) => (
              <tr key={item.id}>
                <td scope="row">{index + 1}</td>
                <td scope="row">
                  <img src={item.photo} alt="" />
                </td>
                <td scope="row">{item.name}</td>
                <td scope="row">{item.position}</td>
                <td scope="row">{item.political_party}</td>
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
            <label htmlFor="position" className="form-label">Position</label>
            <input type="text" className="form-control" id='position' />
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