import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { useOnClickOutside } from '../../common/useonclickoutside';
import { getElections, deleteElection, postElection } from '../../services/electionService';

const Election = (props) => {
  const { capitalize } = props; //eslint-disable-line
  
  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);

  const ref = useRef();
  const nameRef= useRef();
  const dateRef = useRef();
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

   const handleDelete = async (election) => {
    const originalElections = elections;
    const newElections = originalElections.filter((e) => e._id !== election._id);
    setElections(newElections);

    try {
      await deleteElection(election._id);
      toast.success('Election deleted successfuly');
    } catch (error) {
      if(error.response && error.response.status === 404 )
      toast.error('This election has already been deleted.');

      setElections(originalElections);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    try {
      console.log(name, date);
      await postElection(name, date);
      setCreateOpen(!createOpen);
      window.location = "/elections";
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
    }
  }


  return (
    <div>
      <button className='btn btn-primary btn-sm mb-4 mt-2 add'
          onClick={handleCreateOpen}
          >
            New Election
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
              <td scope="row">{item.name.toUpperCase()}</td>
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
        <form action="" ref={ref} onSubmit={handlePost}>
          <div className="mb-3">
            <label htmlFor="election_name" className="form-label">Election Name</label>
            <input
              type="text" 
              ref={nameRef}
              className="form-control"
              id='election_name'
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
            type="date"
            ref={dateRef}
            className="form-control"
            id='date'
            style={{width: '40%'}}/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
Election.propTypes = {
  capitalize: PropTypes.func.isRequired
}
export default Election;