import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/admin_login")
  })
  return null;
}
 
export default AdminLogOut;