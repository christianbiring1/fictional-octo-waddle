import { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import { useOnClickOutside } from '../../common/useonclickoutside';
import { getPositions, deletePosistion } from "../../services/electionService";
import { Delete } from "@mui/icons-material";


const Position = ({capitalize}) => {

  const [positions, setPositions] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, createOpen, () => setCreateOpen(false))

  useEffect(() => {

    async function fetchData() {
      const { data } = await getPositions();
      setPositions(data);
    }
    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

   const handleDelete = async (position) => {
    const originalPositions = positions;
    const newPositions = originalPositions.filter((p) => p._id !== position._id);
    setPositions(newPositions);

    try {
      await deletePosistion(position._id);
      toast.success('Position deleted successfuly', {
        autoClose: 1000,
      });
    } catch (error) {
      if(error.response && error.response.status === 404)
      toast.error('This election has already been deleted.');
      setPositions(originalPositions);
    }
  };


  return (
    <div>
      <button className='btn btn-primary btn-sm mb-4 mt-2 add'
          style={{ padding: '0.7rem', borderRadius: '1.5rem' }}
          onClick={handleCreateOpen}
          >
            Add positions
        </button>
        <ul className="list-group">
          {positions.map(item => (
            <li key={item._id} className="list-group-item">
              <span>{capitalize(item.name)}</span>
              <span>
                <Delete  style={{cursor: 'pointer', color: '#ff6a74'}} onClick={() => handleDelete(item)}/>
              </span>
            </li>
          ))}
        </ul>
      {
        createOpen && 
      <div className="create__form">
        <form action="" ref={ref}>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position Name</label>
            <input type="text" className="form-control" id='position'/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}

Position.propTypes = {
  capitalize: PropTypes.func.isRequired
}
 
export default Position;