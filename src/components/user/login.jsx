import { useState } from "react";
import './login.css'
const UserLogin = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserId(e.currentTarget.value)

    // console.log(userId);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Call the Server
    console.log('Submitted!')
  }

  return (
    <div className="user_login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">ID number</label>
          <input
            type="text"
            value={userId}
            onChange={handleChange}
            className="form-control"
            id="userId"
          />
          <div id="emailHelp" className="form-text">We'll never share your ID with anyone else.</div>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
 
export default UserLogin;