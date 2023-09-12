import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../common/useonclickoutside";
import { toast } from 'react-toastify';
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../common/listGroup";
import { getCandidates, deleteCandidate, postCandidate } from "../../services/candidateService";
import { getElections, getPositions } from "../../services/electionService";
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
  const partyRef = useRef();
  const photoRef = useRef();

  const [pageSize, setPageSize] = useState(6); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState("");



  useOnClickOutside(ref, createOpen, () => setCreateOpen(false));
  useEffect(() => {
    async function fetchData() {
      const { data } = await getCandidates();
      const { data: elections } = await getElections();
      const { data: positions } = await getPositions()
      setCandidates(data);
      setElections( [{ name: 'All Elections', _id: ""}, ...elections]);
      setPositions([{name: 'All Positions', _id: ""}, ...positions]);
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

  // const handleClick = (e) => {
  //   console.log(e.current.files);
  // }

  const handlePost = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const electionId = selectedElection; // Use the selectedElection state
    const positionId = selectedPosition; // Use the selectedPosition state
    // const electionId = electionRef.current.value;
    // const positionId = positionRef.current.value;
    const political_party = partyRef.current.value;
    const photo = photoRef.current.files[0];
    
    try {
      await postCandidate(name, electionId, positionId, political_party, photo);
      setCreateOpen(!createOpen);
      window.location = "/candidates";
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
    }
  };

  const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleElectionSelect = (election) => {
      setGenre(election);
      setCurrentPage(1)
    }

    const filtered = genre && genre._id
      ? candidates.filter(c => c.election._id === genre._id)
      : candidates;
    
    const allCandidates = paginate(filtered, currentPage, pageSize);

  return (
    <div className="candidates__container">
      <h1>Candidates</h1>
      <div className="row">
        <div className="col-2 mt-5">
          <p className="fw-light">Sorty By Election</p>
          <ListGroup
            items={elections}
            selectedItem={genre}
            onItemSelect={handleElectionSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} Candidates in the database</p>
          <div className="create_election">
            <button className='btn btn-primary mb-4 mt-2 add' onClick={handleCreateOpen}>Add candidate</button>
          </div>
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Name</th>
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
                      <img src={`http://localhost:3000/uploads/${item.photo}`} alt={item.name + 'image'} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
                    </td>
                    <td scope="row">{capitalize(item.name)}</td>
                    <td scope="row">{capitalize(item.position.name)}</td>
                    <td scope="row">{item.political_party.toUpperCase()}</td>
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
        <div className="col-2 mt-5">
          <p className="fw-light">Sorty By Position</p>
          <ListGroup
            items={positions}
            selectedItem={genre}
            onItemSelect={handleElectionSelect}
          />
        </div>
      </div>
        {
        createOpen && 
      <div className="create__form">
        <form action="POST" ref={ref} onSubmit={handlePost} encType="multipart/form-data">
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" ref={nameRef} className="form-control" id='name'/>
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select" aria-label="Default select example"
              value={selectedElection}
              onChange={(e) => setSelectedElection(e.target.value)} >
              <option className="fw-lighter" value={""}>select an election</option>
              {elections.map((e) => (
                <>
                  <option key={e._id} value={e._id}>{capitalize(e.name)}</option>
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
                  <option key={p._id} value={p._id}>{capitalize(p.name)}</option>
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