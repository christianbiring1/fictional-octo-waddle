import { Routes, Route } from "react-router-dom";
import AdminLogin from "./registration/log_in";
import SideBar from "./sidebar";
import Elections from "./pages/elections";
import Candidates from "./pages/candidates";
import Electors from "./pages/electors";
import Results from "./pages/results";
import DashBoard from './dashboard';
import GuideLines from "./pages/guidelines";
import './index.css';


const Admin = () => {
  return (
    <div className="admin_container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="admin_components">
        <Routes>
          <Route path="/elections" element={<Elections />}/>
          <Route path="/candidates" element={<Candidates />}/>
          <Route path="/electors" element={<Electors />}/>
          <Route path="/results" element={<Results />}/>
          <Route path="/guidelines" element={<GuideLines />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/" element={<DashBoard/>} />
        </Routes>
      </div>
    </div>
  );
}
 
export default Admin;