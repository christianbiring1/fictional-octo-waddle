import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleElector } from '../../services/electorService';

const EditElector = () => {
  const [electorData, setElectorData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
  async function fetchElectorData() {
    const { data } = await getSingleElector(id);
    setElectorData(data);
  }

  fetchElectorData();
}, [id]);

console.log(electorData);

  const handleSave = () => {
    // Handle saving the edited elector data to the database
  };

  return (
    <div>
      <h1>Edit Elector</h1>
      <form onSubmit={handleSave}>
        {/* Render input fields for editing elector data */}
      </form>
    </div>
  );
};

export default EditElector;




