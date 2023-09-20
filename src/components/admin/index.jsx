import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SideBar from "./sidebar";
import DashBoard from './dashboard';
import Elections from "./pages/elections";
import Candidates from "./pages/candidates";
import Electors from "./pages/electors";
import EditElector from "./pages/editElector";
import Results from "./pages/results";
// import AdminLogin from "./registration/log_in";
import AdminLogOut from "./registration/logout";
// import GuideLines from "./pages/guidelines";
import './index.css';
import AdminSignUp from "./registration/sign_up";


const Admin = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user)
    } catch (error) {} // eslint-disable-line no-empty
  }, []);
  return (
    <div className="admin_container">
      <div className="sidebar">
        <SideBar user={user} />
      </div>
      <div className="admin_components">
        <Routes>
          <Route path="/elections" element={<Elections />}/>
          <Route path="/candidates" element={<Candidates />}/>
          <Route path="/edit-elector/:user_id" element={<EditElector />}/>
          <Route path="/electors" element={<Electors />}/>
          <Route path="/results" element={<Results />}/>
          <Route path="/manage_admins" element={<AdminSignUp />} />
          <Route path="/admin_logout" element={<AdminLogOut />} />
          <Route path="/admin_dashboard" element={<DashBoard/>} />
        </Routes>
      </div>
    </div>
  );
}
 
export default Admin;