import { Routes, Route } from "react-router-dom";
import AdminLogin from "./registration/log_in";
import SideBar from "./sidebar";
import Elections from "./pages/elections";
import Candidates from "./pages/candidates";
import Electors from "./pages/electors";
import Results from "./pages/results";


const Admin = () => {
  return (
    <>
    <SideBar />
      <Routes>
        <Route path="/elections" element={<Elections />}/>
        <Route path="/candidates" element={<Candidates />}/>
        <Route path="/electors" element={<Electors />}/>
        <Route path="/results" element={<Results />}/>
        <Route path="/admin_login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}
 
export default Admin;