import { Routes, Route, NavLink } from "react-router-dom";
import Elections from "./pages/elections";
import Candidates from "./pages/candidates";
import Electors from "./pages/electors";
import Results from "./pages/results";
const SideBar = () => {
  return (
    <div>
      <Elections />
      <Candidates />
      <Electors />
      <Results />
    </div>
  );
}
 
export default SideBar;
