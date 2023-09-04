import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../common/useonclickoutside';
import { toast } from 'react-toastify';
import { getElectors, deleteElectors } from '../../services/electorService';
import { getElections } from '../../services/electionService';
import Pagination from '../../common/pagination';
import ListGroup from '../../common/listGroup';
import { paginate } from '../../utils/paginate';
import { Delete } from '@mui/icons-material';


const Electors = () => {

  const [electors, setElectors] = useState([]);
  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef();
  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));
  useEffect(() => {
    async function fetchData() {
      const { data } = await getElectors();
      const { data: elections } = await getElections();
      setElectors(data);
      setElections(elections);
    }
    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }

  const handleDelete = async (elector) => {
    const originalElectors = electors;
    const newElectors = originalElectors.filter((e) => e._id !== elector._id);
    setElectors(newElectors);
    try {
      await deleteElectors(elector._id);
      toast.success('Elector deleted succesfully.');
    } catch (error) {
      if(error.response && error.response.status === 404)
        toast.error('This candidate has already been deleted.');
      setElectors(originalElectors);
    }
  };

  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleElectionSelect = (election) => {
    console.log(election);
  }

  const allElectors = paginate(electors, currentPage, pageSize)

  return (
    <div className="elections__container">
      <div className="row">
        <div className="col-2">
          <ListGroup items={elections} onItemSelect={handleElectionSelect} />
        </div>
        <div className="col">
          <h1>Electors</h1>
      <div className="create_election">
        <button className='btn btn-primary btn-sm mb-4 mt-2 add' style={{ padding: '0.7rem', borderRadius: '1.5rem' }} onClick={handleCreateOpen}>Add candidate</button>
      </div>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Province</th>
              <th scope="col">Election</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allElectors.map((item, index) => (
              <tr key={item._id}>
                <td scope="row">{index + 1}</td>
                <td scope="row">{capitalize(item.name)}</td>
                <td scope="row">{item.id}</td>
                <td scope="row">{capitalize(item.province)}</td>
                <td scope="row">{capitalize(item.election.name)}</td>
                <td scope="row">
                  <Delete onClick={() => handleDelete(item)} style={{cursor: 'pointer', color: "#ff6a74" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={electors.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        </div>
      </div>
        {
        createOpen && 
      <div className="create__form">
        <form action="" ref={ref}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id='name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="ID" className="form-label">ID</label>
            <input type="text" className="form-control" id='ID' placeholder='000-000-000'/>
          </div>
          <div className="mb-1">
          <div className="mb-1">
            <label htmlFor="province" className="form-label">Province</label>
            <input type="text" className="form-control" id='province' />
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select">
              <option className="fw-lighter" selected>select an election</option>
              {elections.map((e) => (
                <>
                  <option value={e._id}>{capitalize(e.name)}</option>
                </>
              ))}
            </select>
          </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
export default Electors;