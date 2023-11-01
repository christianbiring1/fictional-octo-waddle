import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useOnClickOutside } from "../../common/useonclickoutside";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../common/listGroup";
import { getCandidates, deleteCandidate, postCandidate } from "../../services/candidateService";
import { getElections, getPositions } from "../../services/electionService";
import SearchBox from "../searchBox";
import './styles/elections.css';
import './styles/candidate.css';


const Candidates = () => {

  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [positions, setPositions] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const ref = useRef();
  const nameRef= useRef();
  const lastRef = useRef();
  const partyRef = useRef();
  const photoRef = useRef();

  const [pageSize, setPageSize] = useState(6); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      const { data: elections } = await getElections();
      const { data: positions } = await getPositions()
      setCandidates(data);
      setElections( [{ name: 'All Elections', _id: ""}, ...elections]);
      setPositions(positions);
    }

    fetchData();
  }, []);

  const handleCreateOpen = () => {
    setCreateOpen(!createOpen)
  }
  const handleDelete = async (person) => {
    const originalCandidates = candidates;
    const newCandidates = originalCandidates.filter((c) => c._id !== person._id);
    setCandidates(newCandidates);

    try {
      await deleteCandidate(person._id);
      toast.success('candidate deleted sucessfully.');
    } catch (error) {
      if(error.response && error.response.status === 404 )
      toast.error('This election has already been deleted.');

      setCandidates(originalCandidates);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const first_name = nameRef.current.value;
    const last_name = lastRef.current.value;
    const electionId = selectedElection;
    const positionId = selectedPosition;
    const political_party = partyRef.current.value;
    const photo = photoRef.current.files[0];
    
    try {
      await postCandidate(first_name, last_name, electionId, positionId, political_party, photo);
      setCreateOpen(!createOpen);
      window.location = "/candidates";
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
    }
  };

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleElectionSelect = (election) => {
      setGenre(election);
      setSearchQuery("");
      setCurrentPage(1)
    }

    const handleSearch = query => {
      setSearchQuery(query);
      setGenre(null);
      setCurrentPage(1);
    };

    let filtered = candidates;
    if (searchQuery)
      filtered = candidates.filter(c =>
        c.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) 
          || c.last_name.toLowerCase().startsWith(searchQuery.toLowerCase())
          || c.political_party.toLowerCase().startsWith(searchQuery.toLowerCase())
          || c.position.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (genre && genre._id)
        filtered = candidates.filter(c => c.election._id === genre._id);

    // const filtered = genre && genre._id
    //   ? candidates.filter(c => c.election._id === genre._id)
    //   : candidates;
    
    const allCandidates = paginate(filtered, currentPage, pageSize);

  return (
    <div className="candidates__container">
      <div className="row">
        <div className="col-2 mt-3">
          <p className="fw-lighter mb-0">Sorty By Election</p>
          <ListGroup
            items={elections}
            selectedItem={genre}
            onItemSelect={handleElectionSelect}
          />
        </div>
        <div className="col">
          <h3 className="text-primary">Candidates</h3>
          <p>Showing {filtered.length} Candidates in the database</p>
          <div className="create_election">
            <button className='btn btn-primary mt-2 add' onClick={handleCreateOpen}>Add candidate</button>
          </div>
          <SearchBox
            value={searchQuery}
            onChange={handleSearch}
            placeholder={'Search by names, party or position.....'}
          />
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Political Party</th>
                  <th scope="col">Position</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {allCandidates.map((item, index) => (
                  <tr key={item._id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">
                      <img src={`http://localhost:3000/uploads/${item.photo}`} alt={item.first_name + 'image'} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                    </td>
                    <td scope="row">{_.capitalize(item.first_name)}</td>
                    <td scope="row">{_.capitalize(item.last_name)}</td>
                    <td scope="row">{item.political_party.toUpperCase()}</td>
                    <td scope="row">{_.capitalize(item.position.name)}</td>
                    <td scope="row">
                      <button onClick={() => handleDelete(item)} className="btn btn-danger btn-sm">
                        Delete
                      </button>
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
        <form action="POST" ref={ref} onSubmit={handlePost} encType="multipart/form-data">
          <div className="mb-1">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input type="text" ref={nameRef} className="form-control" id='first_name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input type="text" ref={lastRef} className="form-control" id='last_name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select" aria-label="Default select example"
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)} >
              <option className="fw-lighter" value={""}>select an election</option>
              {elections.map((e) => (
                <>
                  <option key={e._id} value={e._id}>{_.capitalize(e.name)}</option>
                </>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Position</label>
            <select className="form-select" aria-label="Default select example"
              value={selectedPosition} 
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option className="fw-lighter" value={""}>select a position</option>
              {positions.map((p) => (
                <>
                  <option key={p._id} value={p._id}>{_.capitalize(p.name)}</option>
                </>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="political_party" className="form-label">Political Party</label>
            <input type="text" ref={partyRef} className="form-control" id='political_party' />
          </div>
          <div className="mb-1">
            <label htmlFor="photo" className="form-label">Photo</label><br />
            <input type="file" ref={photoRef} className="form-control-file" id='photo' name="photo"/>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      }
    </div>
  );
}
 
export default Candidates;