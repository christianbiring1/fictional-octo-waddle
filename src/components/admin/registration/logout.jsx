import { useEffect } from "react";

const AdminLogOut = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/admin_login"
  })
  return null;
}
 
export default AdminLogOut;