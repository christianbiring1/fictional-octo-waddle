import { Routes, Route } from "react-router-dom";
import AdminLogin from "./registration/log_in";
import SideBar from "./sidebar";


const Admin = () => {
  return (
    <>
    <SideBar />
      <Routes>
        <Route path="/admin_login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}
 
export default Admin;