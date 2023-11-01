import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getSingleElector, postUpdateElector } from '../../services/electorService';
import { getElections } from '../../services/electionService';
import "./styles/editelector.css";


const EditElector = () => {

  const [electorData, setElectorData] = useState([]);
  const [name, setName] = useState("");
  const [ID, setID] = useState('');
  const [address, setAddress] = useState('');
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const { user_id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {

    async function fetchElectorData() {
      const { data: elector } = await getSingleElector(user_id);
      const { data: elections } = await getElections();
      setElectorData(elector);
      setElections(elections);
      setName(electorData.name);
      setID(electorData.id);
      setAddress(electorData.province);
      setSelectedElection(electorData.election);
    }
    
    fetchElectorData();
  }, [user_id, electorData.name]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await postUpdateElector(user_id, name, ID, address, selectedElection);
      navigate("/electors");
    } catch (error) {
      if (error.response)
        toast.error(error.reponse.data);
    }
    // Handle saving the edited elector data to the database
  };
  console.log(name);

  return (
    <div>
      <h1>Edit Elector</h1>
      <div className="edit__form">
        <form action=""  onSubmit={handleSave}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control" id='name'
            />
          </div>
          <div className="mb-1">
            <label htmlFor="ID" className="form-label">ID</label>
            <input type="text"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              className="form-control" id='ID' placeholder='000-000-000'
            />
          </div>
          <div className="mb-1">
          <div className="mb-1">
            <label htmlFor="province" className="form-label">Province</label>
            <input type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control" id='province'
            />
          </div>
          <div className="mb-1">
            <label htmlFor="position" className="form-label">Election</label>
            <select className="form-select" value={selectedElection} onChange={(e) => setSelectedElection(e.target.value)}>
              <option className="fw-lighter" value={""}>Select an election</option>
              {elections.map((e) => (
                <>
                  <option key={e._id} value={e._id}>{_.capitalize(e.name)}</option>
                </>
              ))}
            </select>
          </div>
          </div>
          <button type="Save" className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditElector;




