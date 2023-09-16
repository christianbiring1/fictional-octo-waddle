import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleElector } from "../services/electorService";
import './details.css'

const UserDetails = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    async function fetchData() {
      const { data } = await getSingleElector(id);
      setUser(data);
    }
    fetchData();
  }, [id]);

  console.log(user);

  const handleDirect = () => {
    navigate("/user");
  }

  return (
    <div className="user_details__container">
      <div className="user__details">
        <h1>Welcome {user.name}</h1>
        <div>
          <p>Name: {user.name}</p>
          <p>ID: {user._id}</p>
          <p>Adress: {user.province}</p>
          <button className="btn btn-primary btn-sm" onClick={() => handleDirect()}>Continue</button>
        </div>
      </div>
    </div>
  );
}
 
export default UserDetails;