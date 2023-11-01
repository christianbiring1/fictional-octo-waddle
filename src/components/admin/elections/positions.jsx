import { useEffect, useState, useRef } from "react";
import _ from 'lodash';
import {toast} from 'react-toastify';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; //eslint-disable-line
import { useOnClickOutside } from '../../common/useonclickoutside';
import { getPositions, deletePosistion, postPosition } from "../../services/electionService";
import { getCandidates } from "../../services/candidateService";
import { Delete } from "@mui/icons-material";


const Position = () => {

  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);

  const ref = useRef();
  const inputRef = useRef();

  useOnClickOutside(ref, createOpen, () => setCreateOpen(false))

  useEffect(() => {

    async function fetchData() {
      const { data } = await getPositions();
      const { data: candidates } = await getCandidates();
      setPositions(data);
      setCandidates(candidates);
    }
    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await postPosition(inputRef.current.value);
      toast.success('Position added successfully.')
      setCreateOpen(!createOpen)
      window.location = "/elections"
    } catch (error) {
      if (error.response && error.response.status === 400)
      toast.error(error.response.data)
    }
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

  const candidatesData = {
    labels: positions.map(p => _.capitalize(p.name)),
    datasets: [
      {
        label: 'Number of Candidates',
        data: positions.map(position => 
          candidates.filter(candidate => candidate.position.name === position.name).length),
        backgroundColor: ['rgba(13, 100, 253, 0.8)', 'rgba(255, 165, 0, 0.4)', 'rgba(250, 0, 0, 0.5)'],
        borderColor: '#333',
        // borderWidth: 2
      },
    ],
  };


  return (
    <div>
      <button className='btn btn-primary btn-sm mb-4 mt-2 add'
          onClick={handleCreateOpen}
          >
            Add Position
        </button>
        <ul className="list-group mb-5">
          {positions.map(item => (
            <li key={item._id} className="list-group-item" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <span>{_.capitalize(item.name)}</span>
              <span>
                <Delete  style={{cursor: 'pointer', color: '#ff6a74'}} onClick={() => handleDelete(item)}/>
              </span>
            </li>
          ))}
        </ul>
        <div>
          <Pie data={candidatesData} />
        </div>
      {
        createOpen && 
      <div className="create__form">
        <form action="" ref={ref} onSubmit={handlePost}>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position Name</label>
            <input
            type="text"
            className="form-control"
            id='position'
            ref={inputRef}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
export default Position;