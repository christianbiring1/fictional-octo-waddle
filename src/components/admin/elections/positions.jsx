import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from '../../common/useonclickoutside';
import { getPositions } from "../../services/electionService";


const Position = (props) => {
  const { capitalize } = props;

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

   const handleDelete = (position) => {
    const newPositions = positions.filter((m) => m.id !== position.id);
    setPositions(newPositions);
  };

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }


  return (
    <div>
      <button className='btn btn-primary btn-sm mb-4 mt-2 add'
          style={{ padding: '0.7rem', borderRadius: '1.5rem' }}
          onClick={handleCreateOpen}
          >
            Add positions
        </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Positions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {positions.map((item, index) => (
            <tr key={item._id}>
              <td scope="row">{index + 1}</td>
              <td scope="row">{capitalize(item.name)}</td>
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
            <label htmlFor="name" className="form-label">Position Name</label>
            <input type="text" className="form-control" id='name'/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
export default Position;