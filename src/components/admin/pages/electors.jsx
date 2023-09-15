import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useOnClickOutside } from '../../common/useonclickoutside';
import Pagination from '../../common/pagination';
import { paginate } from '../../utils/paginate';
import ListGroup from '../../common/listGroup';
import SearchBox from '../searchBox';
import { getElectors, deleteElectors, postElector, postImportElector } from '../../services/electorService';
import { getElections } from '../../services/electionService';
import { Delete } from '@mui/icons-material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './styles/elector.css';

const Electors = () => {

  const [electors, setElectors] = useState([]);
  const [elections, setElections] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pageSize, setPageSize] = useState(6); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [importVisible, setImportVisible] = useState(false);
  const fileRef = useRef();

  const nameRef = useRef();
  const idRef = useRef();
  const addressRef = useRef();
  const [selectedElection, setSelectedElection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleElectionSelect = (election) => {
    setGenre(election);
    setSearchQuery("");
    setCurrentPage(1)
  };

  const handleSearch = query => {
    setSearchQuery(query);
    setGenre(null);
    setCurrentPage(1);
  };

  let filtered = electors;
  if (searchQuery)
    filtered = electors.filter(e => 
      e.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      || e.election.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      || e.province.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (genre && genre._id)
      filtered = electors.filter(e => e.election._id === genre._id);

  // const filtered = genre && genre._id
  //   ? electors.filter(e => e.election._id === genre._id)
  //   : electors;

  const allElectors = paginate(filtered, currentPage, pageSize);

  const importForm = () => {
    setImportVisible(!importVisible)
  }

  const handleImportPost = async (e) => {
    e.preventDefault();
    const FILE = fileRef.current.files[0];

    try {
      await postImportElector(FILE);
      toast.success('Elector data imported successfully!')

      setTimeout(() => {
        window.location = "/electors";
        setImportVisible(!importVisible)
      }, 2000)
    } catch (error) {
      if (error)
        toast.error(error.response.data)
    }
  }

  return (
    <div className="elector__container">
      <div className="row">
        <div className="col-3 mt-5">
          <p className='fw-lighter'>Sort By Election</p>
          <ListGroup
            items={elections}
            selectedItem={genre}
            // textProperty="name"
            // valueProperty="_id"
            onItemSelect={handleElectionSelect} 
          />
        </div>
        <div className="col ms-5">
          <h1>Electors</h1>
          <p>Showing {filtered.length} Electors in the database</p>
          <div className="create_elector">
            <button className='btn btn-primary mb-3 mt-2 add' onClick={handleCreateOpen}>New Elector</button>
            <span className='import_zone'>
              <span className='import-text'>
                or import in an excel doc
              </span>
              <button className='import-data' onClick={importForm}>
                <UploadFileIcon style={{color: '#333'}} />
              </button>
            </span>
          </div>
          <SearchBox  value={searchQuery} onChange={handleSearch} placeholder={'Search by name, election or address...'}/>
          <table className="table">
            <thead>
              <tr>
                <th scope='col'>#</th>
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
                    <td scope="row">{_.capitalize(item.name)}</td>
                    <td scope="row">{item.id}</td>
                    <td scope="row">{_.capitalize(item.province)}</td>
                    <td scope="row">{_.capitalize(item.election.name)}</td>
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
      <div className={!importVisible ? 'import_form-container': 'import_form-container active'}>
        <form method='POST' onSubmit={handleImportPost} className={!importVisible ? 'import_form': 'import_form active'} encType="multipart/form-data">
        <button type='button' className='import-btn' onClick={importForm}>X</button>
          <div className="mb-1">
            <label htmlFor="file" className='form-label'>Import Elector details*</label><br />
            <input type="file"  name="file"  className='form-control-file' id='file' ref={fileRef}/><br />
          </div>
          <button type='submit' className="btn btn-primary">Upload</button>
        </form>
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
                  <option key={e._id} value={e._id}>{_.capitalize(e.name)}</option>
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