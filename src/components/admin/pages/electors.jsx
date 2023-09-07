import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../common/useonclickoutside';
import { toast } from 'react-toastify';
import { getElectors, deleteElectors, postElector } from '../../services/electorService';
import { getElections } from '../../services/electionService';
import Pagination from '../../common/pagination';
import ListGroup from '../../common/listGroup';
import { paginate } from '../../utils/paginate';
import { Delete } from '@mui/icons-material';


const Electors = () => {

  const [electors, setElectors] = useState([]);
  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pageSize, setPageSize] = useState(6); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState("");

  const nameRef = useRef();
  const idRef = useRef();
  const addressRef = useRef();
  const [selectedElection, setSelectedElection] = useState("");
  


  const ref = useRef();
  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));
  useEffect(() => {
    async function fetchData() {
      const { data } = await getElectors();
      const { data: elections } = await getElections();
      setElectors(data);

      setElections([{ name: 'All Elections', _id: ""}, ...elections]);
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

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const name = nameRef.current.value;
      const id = idRef.current.value;
      const address = addressRef.current.value;
      const electionId = selectedElection;
      await postElector(name, id, address, electionId);
      window.location = "/electors"
      setCreateOpen(!createOpen);
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
    }
  }

  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleElectionSelect = (election) => {
    setGenre(election)
    setCurrentPage(1)
  };

  const filtered = genre && genre._id
    ? electors.filter(e => e.election._id === genre._id)
    : electors;

  const allElectors = paginate(filtered, currentPage, pageSize);


  return (
    <div className="elections__container">
      <div className="row">
        <div className="col-3">
          <h5 className='fw-lighter'>Available elections</h5>
          <ListGroup
            items={elections}
            selectedItem={genre}
            // textProperty="name"
            // valueProperty="_id"
            onItemSelect={handleElectionSelect} 
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} Electors in the database</p>
      <div className="create_election">
        <button className='btn btn-primary mb-4 mt-2 add' onClick={handleCreateOpen}>New Elector</button>
      </div>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Province</th>
              <th scope="col">Election</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allElectors.map((item) => (
              <tr key={item._id}>
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
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        </div>
      </div>
        {
        createOpen && 
      <div className="create__form">
        <form action="" ref={ref} onSubmit={handlePost}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" ref={nameRef} className="form-control" id='name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="ID" className="form-label">ID</label>
            <input type="text" ref={idRef} className="form-control" id='ID' placeholder='000-000-000'/>
          </div>
          <div className="mb-1">
          <div className="mb-1">
            <label htmlFor="province" className="form-label">Province</label>
            <input type="text" ref={addressRef} className="form-control" id='province' />
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select" value={selectedElection} onChange={(e) => setSelectedElection(e.target.value)}>
              <option className="fw-lighter" value={""}>select an election</option>
              {elections.map((e) => (
                <>
                  <option key={e._id} value={e._id}>{capitalize(e.name)}</option>
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