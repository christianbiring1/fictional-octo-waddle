import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleElector } from '../../services/electorService';

const EditElector = () => {
  const { user_id } = useParams();
  
  useEffect(() => {
    async function fetchElectorData() {
      const { data } = await getSingleElector(user_id);
      setElectorData(data);
    }
    
    fetchElectorData();
  }, [user_id]); 
  const [electorData, setElectorData] = useState([]);
  const [name, setName] = useState(electorData.name || '');
  const [id, setId] = useState(electorData.id || '');
  const [address, setAddress] = useState(electorData.address || '');

console.log(electorData);

  const handleSave = () => {
    // Handle saving the edited elector data to the database
  };

  return (
    <div>
      <h1>Edit Elector</h1>
      <form onSubmit={handleSave}>
        {/* Render input fields for editing elector data */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </form>
    </div>
  );
};

export default EditElector;




